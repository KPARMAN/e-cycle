import { useState } from "react";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Contact Hero */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-emerald-50 mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              onClick={() => navigate("/")}
              className="mb-4 sm:mb-6 px-4 py-2 text-gray-700 hover:text-green-600 bg-transparent hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm"
              aria-label="Go back to home page"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-2">
              Have questions about our e-waste management solutions? We'd love
              to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Get in Touch
                </h2>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    📍 Location
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    E-Cycle Africa
                    <br />
                    Innovative Tech Hub
                    <br />
                    Lagos, Nigeria
                  </p>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    📞 Phone
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    <a
                      href="tel:+234123456789"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      +234 (123) 456-7890
                    </a>
                  </p>
                </div>

                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    ✉️ Email
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    <a
                      href="mailto:info@e-cycle.com"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      info@e-cycle.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    ⏰ Business Hours
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Send us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-semibold text-sm sm:text-base">
                      ✓ Thank you! We've received your message and will get back
                      to you soon.
                    </p>
                  </div>
                )}

                <form
                  name="contact"
                  method="POST"
                  netlify
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors text-sm"
                      aria-label="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors text-sm"
                      aria-label="Your email address"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Your Company"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors text-sm"
                      aria-label="Your company name"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="How can we help?"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors text-sm"
                      aria-label="Message subject"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors resize-none text-sm"
                      aria-label="Your message"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors"
                  >
                    Send Message
                  </Button>

                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    * Required fields
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                  What is the typical response time?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  We aim to respond to all inquiries within 24 business hours.
                  For urgent matters, please call us directly.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                  Do you offer support for organizations outside Nigeria?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Yes, we serve organizations across Africa. Contact us to
                  discuss your specific location and needs.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                  How can I schedule a consultation?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  You can request a consultation through this contact form, and
                  our team will reach out to schedule a meeting at your
                  convenience.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  We accept various payment methods including bank transfers,
                  credit cards, and other digital payment options. Details will
                  be provided during your consultation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
