"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { GlassCard } from "./glass-card"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      alert("Please enter both your name and message")
      return
    }

    const whatsappMessage = `Hello Varsity Scholars,

${message.trim()}

Yours,
${name.trim()}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/917396703904?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    // Reset form and close widget
    setName("")
    setMessage("")
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-8 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-white text-black hover:bg-white/90 shadow-lg ios-bounce"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-26 right-6 w-80 z-50">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Chat with us</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-input min-h-[100px]"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 ios-bounce">
                <Send className="h-4 w-4 mr-2" />
                Send via WhatsApp
              </Button>
            </form>
          </GlassCard>
        </div>
      )}
    </>
  )
}
