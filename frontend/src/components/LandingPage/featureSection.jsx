import { ArrowRight, BarChart3, MousePointer, Zap, Target } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "Landing Pages",
      description: "Drive traffic to focused landing pages that sell products",
      details: [
        "Premium Templates - Use templates based on top brands landing page designs",
        "On Your Domain - Add custom domains, publish to Shopify, or embed anywhere",
        "Funnel Logic - Guide visitors through personalized funnel paths based on interactions",
        "Shopping Funnels - Guide shoppers through funnels that add products to cart"
      ],
      color: "blue"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Quiz Funnels",
      description: "Guide shoppers to recommended products using quiz funnels",
      details: [
        "Quiz Logic - Jump to questions and outcomes using answers and scores",
        "Multiple Formats - Display as popups, pages and embeddable formats",
        "Personalization - Use quiz answers to personalize product offers and email marketing",
        "1-Click Integrations - Fully integrated with Shopify, Klaviyo, Zapier etc"
      ],
      color: "green"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Website Popups",
      description: "Achieve 10%+ opt-in rates & grow your email & SMS list faster with website popup funnels",
      details: [
        "100+ Popup Templates - Choose from 100+ popup templates for welcome offers, promos & more",
        "Multiple Formats - Display popup modals, splash overlays, slide-ups and sticky bars",
        "Granular Targeting - Target popups by content, cart info, location, site history, CRM data etc",
        "1-Click Integrations - Fully integrated with Klaviyo, MailChimp, Hubspot etc"
      ],
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        button: "text-blue-600 hover:text-blue-700"
      },
      green: {
        bg: "bg-green-50",
        icon: "text-green-600",
        button: "text-green-600 hover:text-green-700"
      },
      purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        button: "text-purple-600 hover:text-purple-700"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            All the tools you need to launch & optimize funnels
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            In just minutes, you can launch these types of funnels for your website:
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-16">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-6`}>
                    <div className={colors.icon}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-8">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {feature.details.map((detail, detailIndex) => {
                      const [title, description] = detail.split(' - ');
                      return (
                        <div key={detailIndex} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 ${colors.icon} rounded-full mt-2 flex-shrink-0`}></div>
                          <div>
                            <span className="font-semibold text-gray-900">{title}</span>
                            {description && <span className="text-gray-600"> - {description}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                      Start For Free
                    </button>
                    <a href="#" className={`${colors.button} font-medium inline-flex items-center space-x-1`}>
                      <span>See more</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Visual/Demo */}
                <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                  <div className={`${colors.bg} rounded-xl p-8 aspect-square flex items-center justify-center`}>
                    <div className="text-center">
                      <div className={`w-24 h-24 ${colors.icon} mx-auto mb-4`}>
                        {feature.icon}
                      </div>
                      <p className="text-gray-600 font-medium">
                        {feature.title} Builder Preview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}