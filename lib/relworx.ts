import { z } from "zod";

const BASE_URL = process.env.RELWORX_API_BASE as string;
const API_KEY = process.env.RELWORX_API_KEY as string;
const ACCOUNT_NO = process.env.RELWORX_ACCOUNT_NO as string;

const commonHeaders = {
  Accept: "application/vnd.relworx.v2",
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const RequestPaymentRequest = z.object({
  msisdn: z.string(),
  amount: z.number(),
  currency: z.enum(["UGX", "KES", "TZS"]),
  reference: z.string(),
  reason: z.string(),
  account_no: z.string(),
});

const RequestPaymentResponse = z.object({
  reference: z.string(),
  status: z.string(),
});
export type RequestPaymentResponse = z.infer<typeof RequestPaymentResponse>;

export async function requestPayment(
  params: Omit<z.infer<typeof RequestPaymentRequest>, "account_no">
): Promise<RequestPaymentResponse> {
  const body = RequestPaymentRequest.parse({ ...params, account_no: ACCOUNT_NO });
  const res = await fetch(`${BASE_URL}/mobile-money/request-payment`, {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to request payment");
  }
  return RequestPaymentResponse.parse(data);
}

const StatusResponse = z.object({
  reference: z.string(),
  status: z.string(),
  message: z.string().optional(),
});
export type StatusResponse = z.infer<typeof StatusResponse>;

export async function getPaymentStatus(reference: string): Promise<StatusResponse> {
  const res = await fetch(
    `${BASE_URL}/mobile-money/request-payment/${reference}/status`,
    { headers: commonHeaders }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch status");
  }
  return StatusResponse.parse(data);
}

const VisaSessionRequest = z.object({
  amount: z.number(),
  currency: z.enum(["UGX", "USD"]),
  reason: z.string(),
  reference: z.string(),
  redirect_url: z.string().url(),
  account_no: z.string(),
});

const VisaSessionResponse = z.object({
  session_id: z.string(),
  redirect_url: z.string(),
});
export type VisaSessionResponse = z.infer<typeof VisaSessionResponse>;

export async function createVisaSession(
  params: Omit<z.infer<typeof VisaSessionRequest>, "account_no">
): Promise<VisaSessionResponse> {
  const body = VisaSessionRequest.parse({ ...params, account_no: ACCOUNT_NO });
  const res = await fetch(`${BASE_URL}/visa/session`, {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to create VISA session");
  }
  return VisaSessionResponse.parse(data);
}
