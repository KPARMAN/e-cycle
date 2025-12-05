import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  const values = [
    {
      title: "Sustainability",
      description: "We are committed to promoting environmental sustainability through responsible e-waste management and material recovery.",
      icon: "🌍",
    },
    {
      title: "Transparency",
      description: "Complete visibility into every step of the e-waste lifecycle. We believe in honest communication and detailed reporting.",
      icon: "👁️",
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge technology and AI to optimize e-waste management processes and maximize material recovery.",
      icon: "💡",
    },
    {
      title: "Integrity",
      description: "Operating with the highest ethical standards in compliance with all environmental regulations and certifications.",
      icon: "✨",
    },
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
              Transforming e-waste management in Africa through innovative technology and sustainable practices.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              E-Cycle is dedicated to revolutionizing e-waste management across Africa. We provide comprehensive solutions that connect waste generators with certified recycling partners, ensuring responsible handling of electronic waste while maximizing material recovery and environmental protection.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform brings transparency, efficiency, and sustainability to the entire e-waste lifecycle—from collection and assessment to secure recycling and compliance tracking.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">700+</div>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">40%</div>
                <p className="text-gray-600">Cost Reduction</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">60%</div>
                <p className="text-gray-600">Time Savings</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-gray-600">Compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
