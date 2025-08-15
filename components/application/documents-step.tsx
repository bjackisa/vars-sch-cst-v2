"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, ImageIcon, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

interface DocumentsStepProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function DocumentsStep({ data, updateData, onNext, onPrev }: DocumentsStepProps) {
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (file: File, field: string) => {
    setUploading((prev) => ({ ...prev, [field]: true }))

    try {
      // Create a mock URL for demonstration
      // In production, you would upload to Supabase Storage or another service
      const mockUrl = `https://example.com/uploads/${Date.now()}-${file.name}`

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      updateData({ [field]: mockUrl })
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate required documents
    const requiredDocs = ["passport_photo_url", "academic_documents_url", "passport_document_url"]
    const missingDocs = requiredDocs.filter((doc) => !data[doc])

    if (missingDocs.length > 0) {
      alert("Please upload all required documents")
      setLoading(false)
      return
    }

    setLoading(false)
    onNext()
  }

  const DocumentUpload = ({
    field,
    title,
    description,
    icon: Icon,
    accept,
  }: {
    field: string
    title: string
    description: string
    icon: any
    accept: string
  }) => (
    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-6 w-6 text-white/70" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-white/70 text-sm mb-4">{description}</p>

          {data[field] ? (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Document uploaded successfully</span>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file, field)
                }}
                className="hidden"
                id={field}
                disabled={uploading[field]}
              />
              <label
                htmlFor={field}
                className={`inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors ${
                  uploading[field] ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading[field] ? "Uploading..." : "Choose File"}
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <DocumentUpload
            field="passport_photo_url"
            title="Passport Size Photo"
            description="Upload a recent passport-size photo with all ears visible. Accepted formats: JPG, PNG (Max 5MB)"
            icon={ImageIcon}
            accept="image/*"
          />

          <DocumentUpload
            field="academic_documents_url"
            title="Academic Documents"
            description="Upload your academic transcripts, certificates, and diplomas. Accepted formats: PDF (Max 10MB)"
            icon={FileText}
            accept=".pdf"
          />

          <DocumentUpload
            field="passport_document_url"
            title="Passport Document"
            description="Upload a clear scan of your passport. Accepted formats: PDF (Max 5MB)"
            icon={FileText}
            accept=".pdf"
          />
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <h4 className="font-semibold mb-2">Important Notes:</h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• All documents must be clear and legible</li>
            <li>• Documents should be in English or officially translated</li>
            <li>• File sizes should not exceed the specified limits</li>
            <li>• Ensure all personal information is visible and accurate</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={onPrev} className="glass-button bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Personal Info
          </Button>

          <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-white/90 ios-bounce">
            {loading ? "Validating..." : "Continue to Payment"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </GlassCard>
  )
}
