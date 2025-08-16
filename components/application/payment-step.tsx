"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CreditCard, Smartphone, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { CurrencyConverter } from "@/components/ui/currency-converter"

interface PaymentStepProps {
  data: any
  updateData: (data: any) => void
  onPrev: () => void
  user: any
  preselectedScholarship: any
}

export function PaymentStep({ data, updateData, onPrev, user, preselectedScholarship }: PaymentStepProps) {
  const [loading, setLoading] = useState(false)
  const [mobileMoneyStep, setMobileMoneyStep] = useState<"provider" | "number" | null>(null)
  const [mobileNumber, setMobileNumber] = useState("")
  const router = useRouter()

  const generateTrackingId = () => {
    return "VSC" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase()
  }

  const handleStripePayment = async () => {
    setLoading(true)
    updateData({ payment_method: "stripe" })

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create application in database
      await createApplication("stripe", "completed")
    } catch (error) {
      console.error("Stripe payment error:", error)
      alert("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  const handleMobileMoneyPayment = async (provider: "mtn_momo" | "airtel_pay") => {
    if (!mobileNumber) {
      alert("Please enter your mobile number")
      return
    }

    setLoading(true)
    updateData({ payment_method: provider })

    try {
      // Simulate mobile money processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, we'll show success
      // In production, you would integrate with actual mobile money APIs
      await createApplication(provider, "completed")
    } catch (error) {
      console.error("Mobile money payment error:", error)
      alert("Payment failed. Please try again.")
      setLoading(false)
    }
  }

  const createApplication = async (paymentMethod: string, paymentStatus: string) => {
    const supabase = createClient()
    const trackingId = generateTrackingId()

    const applicationData = {
      id: trackingId,
      user_id: user.id,
      scholarship_id: data.scholarship_id,
      status: "pending",
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      nationality: data.nationality,
      address: data.address,
      emergency_contact_name: data.emergency_contact_name,
      emergency_contact_phone: data.emergency_contact_phone,
      passport_photo_url: data.passport_photo_url,
      academic_documents_url: data.academic_documents_url,
      passport_document_url: data.passport_document_url,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      payment_reference: `PAY_${trackingId}`,
      amount_paid: preselectedScholarship?.application_fee || 0,
    }

    const { error } = await supabase.from("applications").insert(applicationData)

    if (error) {
      console.error("Application creation error:", error)
      alert("Failed to create application. Please try again.")
      setLoading(false)
      return
    }

    // Create notification
    await supabase.from("notifications").insert({
      user_id: user.id,
      application_id: trackingId,
      title: "Application Submitted Successfully",
      message: `Your application for ${preselectedScholarship?.name || "scholarship"} has been submitted. Track your application using ID: ${trackingId}`,
      type: "application_update",
    })

    setLoading(false)
    router.push(`/dashboard?success=true&tracking_id=${trackingId}`)
  }

  const applicationFee = preselectedScholarship?.application_fee || 0

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <div className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white/70">Scholarship:</span>
              <span>{preselectedScholarship?.name || "Selected Scholarship"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Application Fee:</span>
              <CurrencyConverter amount={applicationFee} />
            </div>
            <div className="border-t border-white/10 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <CurrencyConverter amount={applicationFee} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="font-semibold">Choose Payment Method</h3>

          {/* Stripe Payment */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-6 w-6 text-white/70" />
              <div>
                <h4 className="font-semibold">Credit/Debit Card</h4>
                <p className="text-white/70 text-sm">Pay securely with Stripe</p>
              </div>
            </div>

            <Button
              onClick={handleStripePayment}
              disabled={loading}
              className="w-full bg-white text-black hover:bg-white/90 ios-bounce"
            >
              {loading && data.payment_method === "stripe" ? (
                "Processing..."
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Pay</span>
                  <CurrencyConverter amount={applicationFee} />
                  <span>with Card</span>
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Money */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Smartphone className="h-6 w-6 text-white/70" />
              <div>
                <h4 className="font-semibold">Mobile Money</h4>
                <p className="text-white/70 text-sm">Pay with MTN MoMo or Airtel Pay</p>
              </div>
            </div>

            {!mobileMoneyStep && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={() => setMobileMoneyStep("provider")}
                  variant="outline"
                  className="glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  MTN MoMo
                </Button>
                <Button
                  onClick={() => setMobileMoneyStep("provider")}
                  variant="outline"
                  className="glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Airtel Pay
                </Button>
              </div>
            )}

            {mobileMoneyStep === "provider" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
                  <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="glass-input"
                    placeholder="+256 xxx xxx xxx"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleMobileMoneyPayment("mtn_momo")}
                    disabled={loading || !mobileNumber}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    {loading && data.payment_method === "mtn_momo" ? (
                      "Processing..."
                    ) : (
                      <span className="flex items-center justify-center space-x-1 text-sm">
                        <span>Pay</span>
                        <CurrencyConverter amount={applicationFee} />
                        <span>- MTN MoMo</span>
                      </span>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleMobileMoneyPayment("airtel_pay")}
                    disabled={loading || !mobileNumber}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {loading && data.payment_method === "airtel_pay" ? (
                      "Processing..."
                    ) : (
                      <span className="flex items-center justify-center space-x-1 text-sm">
                        <span>Pay</span>
                        <CurrencyConverter amount={applicationFee} />
                        <span>- Airtel Pay</span>
                      </span>
                    )}
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    setMobileMoneyStep(null)
                    setMobileNumber("")
                  }}
                  variant="ghost"
                  className="w-full text-white/70 hover:text-white"
                >
                  Back to Payment Methods
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Secure Payment</h4>
              <p className="text-white/70 text-xs">
                Your payment information is encrypted and secure. We never store your payment details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="glass-button bg-transparent"
            disabled={loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
