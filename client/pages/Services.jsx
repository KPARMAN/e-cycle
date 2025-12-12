import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Bulk E-Waste Marketplace",
      description:
        "Connect with certified recycling companies. Upload batches of faulty or scrap electronics, add photos and weight details, receive offers from verified recyclers, and sell at fair transparent prices.",
      icon: "🛒",
    },
    {
      title: "Verified Recycler Network",
      description:
        "All recycling companies on E-Cycle are vetted for NESREA compliance, proper handling procedures, industry reputation, and environmental safety standards. Sellers can trust ethical processing.",
      icon: "✓",
    },
    {
      title: "E-Waste Logistics Support",
      description:
        "We facilitate safe movement of bulk e-waste with pickup scheduling, aggregation points, coordination with partners, and support for secure transportation.",
      icon: "🚚",
    },
    {
      title: "Secure Payments",
      description:
        "Our digital payment system enables safe transactions, seller protection, instant payout options, and transaction receipts with full traceability (Coming Soon).",
      icon: "💳",
    },
    {
      title: "E-Waste Data & Insights",
      description:
        "Analytics dashboard showing waste volume trends, material categories, high-demand items, and regional supply hotspots. Help recyclers scale operations efficiently.",
      icon: "📊",
    },
    {
      title: "Technician & Business Support",
      description:
        "Expert assistance for listing bulk e-waste, understanding market prices, partnering with recyclers, and navigating environmental compliance to maximize value.",
      icon: "🤝",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Services Hero */}
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
              Our Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              E-Cycle provides a reliable and structured system for sourcing,
              listing, and processing bulk electronic waste across Nigeria.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Partnerships & Corporate Recycling
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
              We work with NGOs, government agencies, community groups,
              electronics companies, and corporate offices for large-scale
              recycling and sustainability programs.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Start turning your e-waste into sustainable value today
            </h2>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-3 rounded-lg font-semibold"
            >
              Explore Our Services
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
