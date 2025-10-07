"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Send,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="contact-page bg-[var(--background-color)] text-[var(--text-color)] min-h-screen py-16 px-6 md:px-20">
      <section className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-[var(--primary-color)]">
            Contact Us
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Have questions, feedback, or want to advertise with{" "}
            <strong>Joshspot TV Stories</strong>? We’d love to hear from you.
            Let’s talk and create something impactful together.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="flex flex-col items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition">
            <Mail className="w-8 h-8 text-[var(--primary-color)] mb-3" />
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-[var(--text-muted)] text-sm mb-3">
              For business, adverts, or general inquiries:
            </p>
            <a
              href="mailto:joshspottv@gmail.com"
              className="text-[var(--primary-color)] hover:underline text-sm"
            >
              joshspottv@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition">
            <Phone className="w-8 h-8 text-[var(--primary-color)] mb-3" />
            <h3 className="font-semibold text-lg mb-2">Call or WhatsApp</h3>
            <p className="text-[var(--text-muted)] text-sm mb-3">
              We’re available for bookings & adverts.
            </p>
            <a
              href="https://wa.me/234XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary-color)] hover:underline text-sm"
            >
              +234 000 000 0000
            </a>
          </div>

          <div className="flex flex-col items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition">
            <MapPin className="w-8 h-8 text-[var(--primary-color)] mb-3" />
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-[var(--text-muted)] text-sm">
              Wuse 2, Abuja, Nigeria
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-5 max-w-2xl mx-auto">
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--text-color)]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-main)] text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--text-color)]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-main)] text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--text-color)]">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full p-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-main)] text-[var(--text-color)] focus:outline-none focus:border-[var(--primary-color)]"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--primary-dark)] transition"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Social Links */}
        <div className="text-center mt-16">
          <h2 className="text-xl font-semibold text-[var(--primary-color)] mb-4">
            Connect with Us
          </h2>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com/joshspottv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition"
            >
              <Instagram className="w-5 h-5 text-[var(--primary-color)]" />
              <span>Instagram</span>
            </a>
            <a
              href="https://twitter.com/joshspot_tv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition"
            >
              <Twitter className="w-5 h-5 text-[var(--primary-color)]" />
              <span>Twitter</span>
            </a>
            <a
              href="https://wa.me/234XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition"
            >
              <MessageCircle className="w-5 h-5 text-[var(--primary-color)]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-12">
          © {new Date().getFullYear()} Joshspot TV Stories — We’re just a
          message away.
        </p>
      </section>
    </main>
  );
}
