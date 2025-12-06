import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.jsx";

const faqs = [
  {
    question: "How does the platform work?",
    answer:
      "E-Cycle uses advanced AI and machine learning to categorize, track, and manage your e-waste throughout its entire lifecycle. Our platform integrates with your existing systems and provides real-time insights and automated workflows for efficient waste management.",
  },
  {
    question: "Is the data on E-Cycle secure and compliant?",
    answer:
      "Yes, we maintain enterprise-grade security with ISO 27001 certification, GDPR compliance, and SOC 2 Type II attestation. All data is encrypted in transit and at rest, with regular security audits.",
  },
  {
    question: "Can E-Cycle integrate with my existing systems?",
    answer:
      "Absolutely. We provide comprehensive API documentation and pre-built integrations with popular ERP systems, inventory management platforms, and accounting software. Our team can also help with custom integrations.",
  },
  {
    question: "What is the implementation timeline?",
    answer:
      "Most implementations are completed within 4-6 weeks depending on your system complexity. We provide dedicated onboarding specialists and training to ensure smooth adoption across your organization.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "We offer 24/7 customer support via email, phone, and live chat. Premium plans include dedicated account managers and priority support to ensure your success.",
  },
];

export default function FAQ() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
            FAQs
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Find answers to common questions about E-Cycle and our platform
            features.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-4 sm:px-6"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground hover:text-primary py-3 sm:py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8 sm:mt-12">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">
            Our support team to help you find answers.
          </p>
          <button className="bg-primary text-black hover:bg-primary/90 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base w-full sm:w-auto">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
