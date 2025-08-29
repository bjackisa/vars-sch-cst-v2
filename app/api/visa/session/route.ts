import { NextResponse } from "next/server";
import { createVisaSession } from "@/lib/relworx";
import { z } from "zod";

const schema = z.object({
  amount: z.number(),
  currency: z.enum(["UGX", "USD"]),
  reason: z.string(),
  reference: z.string(),
  redirect_url: z.string().url(),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  try {
    const res = await createVisaSession(parsed.data);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create session" },
      { status: 500 }
    );
  }
}
