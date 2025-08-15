"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { PersonalInfoStep } from "./personal-info-step"
import { DocumentsStep } from "./documents-step"
import { PaymentStep } from "./payment-step"
import { CheckCircle, User, FileText, CreditCard } from "lucide-react"

interface ApplicationFormProps {
  user: any
  userProfile: any
  preselectedScholarship: any
}

export function ApplicationForm({ user, userProfile, preselectedScholarship }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationData, setApplicationData] = useState({
    // Step 1: Personal Information
    full_name: userProfile?.full_name || "",
    email: user?.email || "",
    phone: userProfile?.phone || "",
    date_of_birth: userProfile?.date_of_birth || "",
    gender: userProfile?.gender || "",
    nationality: userProfile?.country || "Uganda",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    scholarship_id: preselectedScholarship?.id || "",

    // Step 2: Documents
    passport_photo_url: "",
    academic_documents_url: "",
    passport_document_url: "",

    // Step 3: Payment
    payment_method: "",
    payment_status: "pending",
  })

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Documents", icon: FileText },
    { number: 3, title: "Payment", icon: CreditCard },
  ]

  const updateApplicationData = (data: Partial<typeof applicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <GlassCard>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = currentStep > step.number
            const isCurrent = currentStep === step.number

            return (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-white text-black"
                        : isCurrent
                          ? "bg-white/20 text-white border-2 border-white"
                          : "bg-white/5 text-white/50"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>

                  <div className="hidden md:block">
                    <p
                      className={`font-medium ${
                        isCompleted || isCurrent ? "text-white" : "text-white/50"
                      } transition-colors`}
                    >
                      Step {step.number}
                    </p>
                    <p
                      className={`text-sm ${
                        isCompleted || isCurrent ? "text-white/70" : "text-white/40"
                      } transition-colors`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-20 h-0.5 mx-4 transition-colors ${
                      isCompleted ? "bg-white" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Step Content */}
      {currentStep === 1 && (
        <PersonalInfoStep
          data={applicationData}
          updateData={updateApplicationData}
          onNext={nextStep}
          preselectedScholarship={preselectedScholarship}
        />
      )}

      {currentStep === 2 && (
        <DocumentsStep data={applicationData} updateData={updateApplicationData} onNext={nextStep} onPrev={prevStep} />
      )}

      {currentStep === 3 && (
        <PaymentStep
          data={applicationData}
          updateData={updateApplicationData}
          onPrev={prevStep}
          user={user}
          preselectedScholarship={preselectedScholarship}
        />
      )}
    </div>
  )
}
