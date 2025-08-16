import Link from "next/link"
import { Phone, MessageCircle, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright and Company Info */}
          <div className="text-center md:text-left">
            <p className="text-white/70 text-sm">
              © Varsity Scholars Consult Limited. Level 2, Echo Plaza, Martin Rd, Old Kampala (UG).
            </p>
            <p className="text-white/50 text-xs mt-1">
              +91 73967 03904 • +256 763253514 • Registered with URSB in Uganda
            </p>
          </div>

          {/* Developer Credit */}
          <div className="flex items-center space-x-4">
            <span className="text-white/50 text-xs">developed by jackisa daniel barack</span>
            <div className="flex items-center space-x-2">
              <Link
                href="https://wa.me/256702860347"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors ios-bounce"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link href="tel:256760570331" className="text-white/50 hover:text-white transition-colors ios-bounce">
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href="https://my.jackisa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors ios-bounce"
              >
                <Globe className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
