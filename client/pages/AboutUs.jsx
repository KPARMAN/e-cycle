import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  const promises = [
    { title: "Transparency", icon: "👁️" },
    { title: "Fair Pricing", icon: "💰" },
    { title: "Environmental Responsibility", icon: "🌍" },
    { title: "Safe Recycling", icon: "✓" },
    { title: "Strong Support for Technicians", icon: "🤝" },
  ];

  const partners = [
    "E-Terra",
    "Hinckley Recycling",
    "JAZ Metals",
    "ROSE Electronics",
    "NGOs and community groups",
    "NESREA, PEPSA, Ministry of Environment",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* About Hero */}
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
              About E-Cycle
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transforming e-waste management in Africa through innovative
              technology and sustainable practices.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              To create a seamless pipeline that connects technicians and bulk
              e-waste sellers to certified recyclers—ensuring safe disposal,
              environmental sustainability, and fair value recovery.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A Nigeria where e-waste is no longer burned or dumped, but
              efficiently collected, reused, and recycled through a structured
              digital marketplace.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What We Do
            </h2>
            <ul className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Provide a marketplace for bulk e-waste.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Connect sellers to trusted recycling companies.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>
                  Ensure compliance with NESREA & environmental standards.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>
                  Facilitate bulk logistics for safe e-waste movement.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>
                  Support technicians and businesses with a reliable disposal
                  solution.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why We Exist Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why We Exist
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Technicians and sellers lack:
                </h3>
                <ul className="space-y-2 text-lg text-gray-600 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Reliable buyers for bulk scrap</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Fair and transparent pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Safe and legal disposal channels</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Recyclers need:
                </h3>
                <ul className="space-y-2 text-lg text-gray-600 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Consistent, high-volume supply</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Verified, sorted batches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Easier logistics</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <p className="text-lg text-gray-700 font-semibold">
                  E-Cycle bridges this gap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Partners Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Partners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="text-primary text-xl mr-3">✓</span>
                  <span className="text-gray-700 font-medium">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Promise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {promises.map((promise, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
                >
                  <div className="text-4xl mb-4">{promise.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {promise.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Join the E-Cycle Community
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of the sustainable e-waste management revolution.
            </p>
            <Button
              onClick={() => navigate("/auth/role-selection")}
              className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
