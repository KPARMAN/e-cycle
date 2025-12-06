const stories = [
  {
    name: "Michael Chen",
    role: "Operations Director",
    quote:
      "E-Cycle has transformed how we manage our electronic waste. We've reduced processing time by 60% and improved compliance tracking significantly.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "James Chen",
    company: "EcoRecycle Inc",
    role: "Operations Manager, GreenTech Innovations",
    quote:
      "The platform's AI insights have helped us identify new revenue streams from e-waste recovery. Highly recommended for any organization serious about sustainability.",
    rating: 4,
    initials: "SR",
  },
  {
    name: "David Kim",
    company: "Digital Waste Corp",
    role: "CEO",
    quote:
      "Outstanding solution for e-waste management. The automated workflows have freed up our team to focus on strategic initiatives. ROI was achieved within 6 months.",
    rating: 5,
    initials: "DK",
  },
];

export default function CustomerStories() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Customer stories
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              See how businesses are transforming their e-waste management with
              our innovative platform. Real results from real organizations
              driving sustainable change.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/7512913/pexels-photo-7512913.jpeg"
              alt="E-waste recycling: Woman sorting plastic and electronic materials into recycling bin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(story.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                "{story.quote}"
              </p>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    {story.initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base">
                    {story.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {story.role}
                  </p>
                  <p className="text-xs text-gray-500">{story.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
