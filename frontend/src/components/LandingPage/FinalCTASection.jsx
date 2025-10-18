import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Our short list of must-have apps: Shopify, Klaviyo, and ConvertFlow.",
      author: "Jacob Forrest",
      role: "Head of Marketing",
      company: "SimpleShot",
      rating: 5
    },
    {
      quote: "Having ConvertFlow on my site feels like having secret superpowers.",
      author: "Frank N.",
      role: "Lifecycle Marketer",
      rating: 5
    },
    {
      quote: "ConvertFlow has allowed us to better measure our campaigns, so we can better take advantage of optimization opportunities and scale results faster.",
      author: "Stefan Grech",
      role: "Head of Infrastructure",
      company: "Catena",
      rating: 5
    },
    {
      quote: "ConvertFlow is one of the most powerful and capable pop-ups, surveys, and landing page tools out there.",
      author: "Frank N.",
      role: "Lifecycle Marketer",
      rating: 5
    },
    {
      quote: "Has helped us get over 150,000+ email and SMS subscribers in the past year.",
      author: "Jay Vasse",
      role: "Digital Marketing Manager",
      company: "Cuddle Clones",
      rating: 5
    },
    {
      quote: "We created a popup on literally day one that has been a consistent 35% add to cart boost since the day we made it.",
      author: "Jacob Forrest",
      role: "Owner",
      company: "simple-shot.com",
      rating: 5
    }
  ];

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our customers say it best
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-600 ml-2">4.9/5 – 2025 Top Rated Funnel Builder</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-900 mb-4 font-medium">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Join 200k+ companies using ConvertFlow to scale their business
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
            Start For Free
          </button>
        </div>
      </div>
    </section>
  );
}