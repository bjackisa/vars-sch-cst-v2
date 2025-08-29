import { NextResponse } from "next/server";
import { getPaymentStatus } from "@/lib/relworx";
import { z } from "zod";

const schema = z.object({ reference: z.string() });

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  try {
    const res = await getPaymentStatus(parsed.data.reference);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Status check failed" },
      { status: 500 }
    );
  }
}
