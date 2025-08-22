import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Circle, Rocket, Building2, CreditCard, Network } from "lucide-react";

export function Roadmap() {
  const [visiblePhases, setVisiblePhases] = useState(0);
  const [animationCycle, setAnimationCycle] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Initial slide-in animation
      const slideInTimer = setInterval(() => {
        setVisiblePhases(prev => {
          if (prev < phases.length) {
            return prev + 1;
          }
          clearInterval(slideInTimer);
          
          // Start the repeating circle animation cycle after slide-in completes
          setTimeout(() => {
            const cycleAnimation = () => {
              setAnimationCycle(0);
              
              // Animate each phase sequentially
              for (let i = 0; i < phases.length; i++) {
                setTimeout(() => {
                  setAnimationCycle(i + 1);
                }, i * 2500); // 2.5 seconds per phase for readable progression
              }
              
              // Reset and repeat after all phases complete
              setTimeout(() => {
                cycleAnimation();
              }, phases.length * 2500 + 3000); // 3 second pause before repeating
            };
            
            cycleAnimation();
          }, 1000); // Wait 1 second after slide-in completes
          
          return prev;
        });
      }, 300);
      return () => clearInterval(slideInTimer);
    }
  }, [isInView]);

  const phases = [
    {
      phase: 1,
      title: "Concept & Validation",
      subtitle: "Idea to Reality",
      description: "Transform your vision into a validated digital product concept with clear market potential.",
      details: [
        "Market research and competitive analysis to validate your idea",
        "Define target audience and create detailed user personas", 
        "Develop minimum viable product (MVP) specifications",
        "Create compelling brand identity and messaging strategy",
        "Set up analytics framework for data-driven decisions"
      ],
      icon: Rocket,
      active: true,
      completed: true
    },
    {
      phase: 2,
      title: "Development & Launch", 
      subtitle: "Building Your Product",
      description: "Build and deploy your digital product with professional infrastructure and user experience.",
      details: [
        "Design and develop responsive web application or platform",
        "Implement user authentication and data management systems",
        "Create intuitive user interface with conversion optimization",
        "Build comprehensive admin dashboard for operations",
        "Deploy with scalable hosting and security best practices"
      ],
      icon: Building2,
      active: true,
      completed: true
    },
    {
      phase: 3,
      title: "Monetization & Growth",
      subtitle: "Revenue Generation",
      description: "Implement payment systems and growth strategies to scale your digital product business.",
      details: [
        "Integrate payment processing and subscription management",
        "Launch customer acquisition and retention campaigns",
        "Implement pricing strategies and revenue optimization",
        "Deploy customer support and success infrastructure",
        "Add advanced features based on user feedback and analytics"
      ],
      icon: CreditCard,
      active: true,
      completed: false
    },
    {
      phase: 4,
      title: "Scale & Optimization",
      subtitle: "Market Expansion",
      description: "Expand your reach through strategic partnerships and advanced optimization techniques.",
      details: [
        "Develop integrations with complementary platforms and services",
        "Launch affiliate and partnership programs for growth",
        "Implement advanced analytics and business intelligence",
        "Expand feature set and explore new market opportunities",
        "Build API ecosystem for third-party developers and integrations"
      ],
      icon: Network,
      active: true,
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
            <h2 className="text-4xl font-bold text-bee-black leading-tight mb-4">Digital Product Development Process</h2>
            <p className="text-xl text-bee-slate max-w-3xl mx-auto">
              Our proven methodology for taking your digital product idea from concept to market success, 
              with strategic guidance at every stage.
            </p>
          </motion.div>
          
          <div ref={ref} className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-300">
              <motion.div
                className="w-full bg-bee-gold"
                initial={{ height: 0 }}
                animate={{ 
                  height: isInView ? `${Math.max((visiblePhases / phases.length) * 100, (animationCycle / phases.length) * 100)}%` : 0 
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-12">
              {phases.map((phase, index) => {
                const IconComponent = phase.icon;
                const isVisible = index < visiblePhases;
                const isAnimating = animationCycle > index;
                const isCompleteInCycle = animationCycle > index + 0.5;
                
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
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4"
                          animate={{
                            backgroundColor: isAnimating ? '#FFC72C' : '#f3f4f6',
                            borderColor: isAnimating ? '#ffffff' : '#d1d5db',
                            boxShadow: isAnimating ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
                          }}
                          transition={{ duration: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.div
                            animate={{
                              scale: isCompleteInCycle ? 1 : 0,
                              opacity: isCompleteInCycle ? 1 : 0
                            }}
                            transition={{ duration: 0.5, delay: 1.8 }}
                          >
                            <CheckCircle className="w-8 h-8 text-bee-black" />
                          </motion.div>
                          
                          <motion.div
                            animate={{
                              scale: isCompleteInCycle ? 0 : 1,
                              opacity: isCompleteInCycle ? 0 : 1
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <IconComponent className={`w-8 h-8 ${
                              isAnimating ? 'text-bee-black' : 'text-gray-500'
                            }`} />
                          </motion.div>
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
                                  <motion.span
                                animate={{ 
                                  scale: isCompleteInCycle ? [1, 1.1, 1] : [1],
                                  backgroundColor: isCompleteInCycle ? '#dcfce7' : isAnimating ? '#fef3c7' : '#f3f4f6'
                                }}
                                transition={{ duration: 0.3 }}
                                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                  isCompleteInCycle ? 'text-green-800' : isAnimating ? 'text-yellow-800' : 'text-gray-600'
                                }`}
                              >
                                {isCompleteInCycle ? 'Complete' : isAnimating ? 'In Progress' : 'Pending'}
                              </motion.span>
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
                                <motion.div
                                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                  animate={{
                                    backgroundColor: isCompleteInCycle ? '#10b981' : isAnimating ? '#FFC72C' : '#9ca3af'
                                  }}
                                  transition={{ duration: 0.4, delay: detailIndex * 0.3 }}
                                />
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
                <h4 className="text-2xl font-bold text-bee-black mb-4">Digital Product Development Progress</h4>
                <div className="flex justify-center items-center space-x-8">
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold mb-1"
                      animate={{ 
                        color: animationCycle > 0 ? '#FFC72C' : '#059669',
                        scale: animationCycle > 0 ? [1, 1.1, 1] : [1]
                      }}
                      transition={{ duration: 0.3, repeat: animationCycle > 0 ? Infinity : 0, repeatDelay: 2 }}
                    >
                      {Math.floor(animationCycle)}/4
                    </motion.div>
                    <p className="text-bee-slate text-sm">
                      {animationCycle > 0 ? 'Current Stage' : 'Stages Complete'}
                    </p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold mb-1"
                      animate={{ 
                        color: animationCycle > 0 ? '#FFC72C' : '#059669',
                        scale: animationCycle > 0 ? [1, 1.1, 1] : [1]
                      }}
                      transition={{ duration: 0.3, repeat: animationCycle > 0 ? Infinity : 0, repeatDelay: 2 }}
                    >
                      {Math.round((animationCycle / phases.length) * 100)}%
                    </motion.div>
                    <p className="text-bee-slate text-sm">
                      {animationCycle > 0 ? 'Development Progress' : 'Process Complete'}
                    </p>
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
