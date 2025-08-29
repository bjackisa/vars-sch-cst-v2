import { NextResponse } from "next/server";
import { requestPayment } from "@/lib/relworx";
import { rateLimit } from "@/lib/limiter";
import { z } from "zod";

const schema = z.object({
  msisdn: z.string(),
  amount: z.number(),
  currency: z.enum(["UGX", "KES", "TZS"]).default("UGX"),
  reference: z.string(),
  reason: z.string(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const allowed = await rateLimit(`mm:${parsed.data.msisdn}`);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }
  }

  try {
    const res = await requestPayment(parsed.data);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Payment request failed" },
      { status: 500 }
    );
  }
}
