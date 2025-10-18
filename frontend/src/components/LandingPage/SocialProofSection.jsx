export default function SocialProofSection() {
  const stats = [
    { number: "10K+", label: "Sites Use ConvertFlow" },
    { number: "2.7B+", label: "Sessions Tracked" },
    { number: "60M+", label: "Funnel Sessions Per Month" },
    { number: "$1B+", label: "GMV With ConvertFlow" }
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
          
          <blockquote className="text-xl md:text-2xl text-gray-900 mb-6 font-medium">
            "I recommend using a tool like ConvertFlow…"
          </blockquote>
          
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            "We're constantly trying to find offers that work. Once we find a winner, we roll it out to the maximum—but we're also always thinking about the next one. It's important that we're able to move fast and quickly test new ideas and messaging."
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Scott McLeod</div>
              <div className="text-gray-600">Co-Founder, Nectar Sleep</div>
            </div>
          </div>
          
          <div className="mt-6">
            <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
              Funnel case study →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}