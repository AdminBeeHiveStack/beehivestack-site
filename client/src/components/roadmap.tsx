import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Circle, Rocket, Building2, CreditCard, Network } from "lucide-react";

export function Roadmap() {
  const [visiblePhases, setVisiblePhases] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setVisiblePhases(prev => {
          if (prev < phases.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 300);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const phases = [
    {
      phase: 1,
      title: "Foundation & Validation",
      subtitle: "Building the Foundation",
      description: "Establish core platform infrastructure and market validation.",
      details: [
        "Launch professional BeeHiveStack.net landing page",
        "Implement email capture with automated welcome sequences", 
        "Deploy comprehensive legal framework",
        "Establish brand identity and market validation",
        "Set up analytics and feedback collection systems"
      ],
      icon: Rocket,
      active: true,
      completed: true
    },
    {
      phase: 2,
      title: "Product Ecosystem Development", 
      subtitle: "Expanding the Marketplace",
      description: "Build comprehensive marketplace with Deal Desk integration.",
      details: [
        "Launch curated microsites for digital products and SaaS",
        "Develop Deal Desk marketplace for business acquisitions",
        "Create investor/seller onboarding and matching systems",
        "Build comprehensive admin dashboard for operations",
        "Establish partnership criteria and vetting processes"
      ],
      icon: Building2,
      active: true,
      completed: true
    },
    {
      phase: 3,
      title: "Payment Infrastructure & Expansion",
      subtitle: "Monetization & Growth",
      description: "Enable payments and expand platform capabilities.",
      details: [
        "Enable Stripe payment processing on approved properties",
        "Launch /compare pages for product evaluation",
        "Implement transaction fee systems and revenue sharing",
        "Deploy customer support infrastructure",
        "Add advanced filtering and search capabilities"
      ],
      icon: CreditCard,
      active: false,
      completed: false
    },
    {
      phase: 4,
      title: "Scale & Strategic Partnerships",
      subtitle: "Market Leadership",
      description: "Expand reach through partnerships and integrations.",
      details: [
        "Expand product catalog across multiple verticals",
        "Integrate with major partner platforms and marketplaces",
        "Launch affiliate and referral programs",
        "Develop API for third-party integrations",
        "Implement advanced analytics and business intelligence"
      ],
      icon: Network,
      active: false,
      completed: false
    }
  ];

  return (
    <section id="roadmap" className="py-16 bg-bee-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-bee-black leading-tight mb-4">High-Level Rollout</h2>
            <p className="text-xl text-bee-slate max-w-3xl mx-auto">
              Our systematic approach to building the premier digital business marketplace, 
              from foundation to market leadership.
            </p>
          </motion.div>
          
          <div ref={ref} className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-300">
              <motion.div
                className="w-full bg-bee-gold"
                initial={{ height: 0 }}
                animate={{ height: isInView ? `${(visiblePhases / phases.length) * 100}%` : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-12">
              {phases.map((phase, index) => {
                const IconComponent = phase.icon;
                const isVisible = index < visiblePhases;
                
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                    className="relative"
                  >
                    <div className="flex items-start space-x-6 md:space-x-8">
                      {/* Phase Indicator */}
                      <div className="flex-shrink-0 relative z-10">
                        <motion.div
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                            phase.completed 
                              ? 'bg-bee-gold border-4 border-white shadow-lg' 
                              : phase.active
                              ? 'bg-bee-gold/20 border-4 border-bee-gold'
                              : 'bg-gray-100 border-4 border-gray-300'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {phase.completed ? (
                            <CheckCircle className="w-8 h-8 text-bee-black" />
                          ) : (
                            <IconComponent className={`w-8 h-8 ${
                              phase.active ? 'text-bee-gold' : 'text-gray-500'
                            }`} />
                          )}
                        </motion.div>
                        
                        {/* Phase Number Badge */}
                        <motion.div
                          className="absolute -top-1 -right-1 w-6 h-6 bg-bee-black text-white rounded-full flex items-center justify-center text-xs font-bold"
                          initial={{ scale: 0 }}
                          animate={isVisible ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: index * 0.3 + 0.3 }}
                        >
                          {phase.phase}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <motion.div
                          className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                          whileHover={{ y: -2 }}
                        >
                          <div className="mb-4">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl md:text-2xl font-bold text-bee-black">
                                {phase.title}
                              </h3>
                              {phase.completed && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                                >
                                  Complete
                                </motion.span>
                              )}
                              {phase.active && !phase.completed && (
                                <motion.span
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="bg-bee-gold text-bee-black text-xs font-medium px-2.5 py-0.5 rounded-full"
                                >
                                  In Progress
                                </motion.span>
                              )}
                            </div>
                            <p className="text-bee-gold font-medium text-sm mb-2">{phase.subtitle}</p>
                            <p className="text-bee-slate text-lg leading-relaxed">{phase.description}</p>
                          </div>

                          {/* Details List */}
                          <div className="space-y-3">
                            {phase.details.map((detail, detailIndex) => (
                              <motion.div
                                key={detailIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.3 + 0.6 + detailIndex * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                  phase.completed ? 'bg-green-500' : phase.active ? 'bg-bee-gold' : 'bg-gray-400'
                                }`} />
                                <p className="text-bee-slate">{detail}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Completion Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visiblePhases >= phases.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 2 }}
              className="mt-16 text-center"
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <h4 className="text-2xl font-bold text-bee-black mb-4">Current Progress</h4>
                <div className="flex justify-center items-center space-x-8">
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-bee-gold mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.5, type: "spring" }}
                    >
                      2/4
                    </motion.div>
                    <p className="text-bee-slate text-sm">Phases Complete</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-green-600 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.7, type: "spring" }}
                    >
                      50%
                    </motion.div>
                    <p className="text-bee-slate text-sm">Roadmap Progress</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
