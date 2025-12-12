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

  const contactChannels = [
    { icon: "📞", label: "Phone", value: "+234 (your number)", href: "tel:+234" },
    { icon: "📧", label: "Email", value: "support@ecycle.ng", href: "mailto:support@ecycle.ng" },
    { icon: "💬", label: "WhatsApp", value: "Start a chat instantly", href: "https://wa.me/" },
  ];

  const supportItems = [
    "Listing guidance",
    "Recycler verification",
    "Transaction issues",
    "Technical support",
  ];

  const socialMedia = [
    { name: "Facebook", icon: "f" },
    { name: "Instagram", icon: "📷" },
    { name: "X (Twitter)", icon: "𝕏" },
    { name: "TikTok", icon: "♪" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Contact Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              onClick={() => navigate("/")}
              className="mb-6 px-4 py-2 text-gray-700 hover:text-green-600 bg-transparent hover:bg-gray-100 rounded-lg font-medium transition-colors"
              aria-label="Go back to home page"
            >
              ← Back to Home
            </Button>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have bulk e-waste to sell or want to partner with us? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Channels
                </h2>

                {contactChannels.map((channel, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {channel.icon} {channel.label}
                    </h3>
                    <p className="text-gray-600">
                      {channel.href.startsWith("mailto:") || channel.href.startsWith("tel:") ? (
                        <a
                          href={channel.href}
                          className="text-green-600 hover:text-green-700 transition-colors"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        channel.value
                      )}
                    </p>
                  </div>
                ))}

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    ⏰ Business Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday – Saturday<br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-semibold">
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
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                      aria-label="Your full name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+234 (123) 456-7890"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                      aria-label="Your phone number"
                    />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label
                      htmlFor="businessType"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Business Type *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                      aria-label="Your business type"
                    >
                      <option value="">Select an option</option>
                      <option value="technician">Technician</option>
                      <option value="seller">Seller</option>
                      <option value="recycler">Recycler</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Message / Type of e-waste *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Describe your e-waste or inquiry..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 transition-colors resize-none"
                      aria-label="Your message"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-lg font-semibold text-base transition-colors"
                  >
                    Send Message
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * Required fields
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Support & Complaints Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Support & Complaints
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
              We assist with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-gray-200 flex items-center"
                >
                  <span className="text-primary text-xl mr-4">✓</span>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Follow Us on Social Media
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialMedia.map((social, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-4">{social.icon}</div>
                  <p className="font-semibold text-gray-900">{social.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
