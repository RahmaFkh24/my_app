
    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';
    import { Link2, BarChart2, CalendarClock, CheckCircle } from 'lucide-react';


    const steps = [
      {
        icon: Link2,
        title: "Connect Your Accounts",
        description: "Link your Facebook, Instagram, Twitter, and other social profiles to get started.",
        imgKey: "connect"
      },
      {
        icon: CalendarClock,
        title: "Schedule Your First Post",
        description: "Use our intuitive scheduler to plan your content in advance across multiple platforms.",
         imgKey: "schedule"
      },
      {
        icon: BarChart2,
        title: "Track Your Performance",
        description: "Monitor engagement, reach, and follower growth with our comprehensive analytics.",
        imgKey: "analytics"
      },
       {
        icon: CheckCircle,
        title: "You're All Set!",
        description: "Explore the dashboard and start managing your social media like a pro.",
        imgKey: "complete"
      },
    ];

   const OnboardingPage = () => {
       const [currentStep, setCurrentStep] = useState(0);
       const navigate = useNavigate();

       const [[stepPage, direction], setStepPage] = useState([0, 0]);


       const handleNext = () => {
           const nextStepIndex = currentStep + 1;
           if (nextStepIndex < steps.length) {
               setCurrentStep(nextStepIndex);
                setStepPage([nextStepIndex, 1]);
           } else {
             localStorage.setItem('isNewUser', 'false');
             navigate('/dashboard');
           }
       };

        const handleSkip = () => {
            localStorage.setItem('isNewUser', 'false');
            navigate('/dashboard');
        };

       const variants = {
           enter: (direction) => {
           return {
               x: direction > 0 ? 1000 : -1000,
               opacity: 0
           };
           },
           center: {
           zIndex: 1,
           x: 0,
           opacity: 1
           },
           exit: (direction) => {
           return {
               zIndex: 0,
               x: direction < 0 ? 1000 : -1000,
               opacity: 0
           };
           }
       };

       // Get the current Icon component and assign it to a variable starting with an uppercase letter
       const IconComponent = steps[currentStep].icon;


     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
               <motion.div
                   key={stepPage}
                   custom={direction}
                   variants={variants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={{
                       x: { type: "spring", stiffness: 300, damping: 30 },
                       opacity: { duration: 0.2 }
                   }}
                   className="max-w-lg w-full bg-card p-8 rounded-xl shadow-2xl text-center flex flex-col items-center"
               >
                   <motion.div
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.2, type: 'spring' }}
                       className="mb-6 bg-primary/10 p-4 rounded-full text-primary"
                   >
                       {/* Use the IconComponent variable here */}
                       <IconComponent size={40} />
                   </motion.div>
                   <h2 className="text-3xl font-bold mb-3">{steps[currentStep].title}</h2>
                   <p className="text-muted-foreground mb-8">{steps[currentStep].description}</p>

                   <div className="h-40 w-full bg-secondary rounded-lg mb-8 flex items-center justify-center text-muted-foreground italic">
                      Visual for step {currentStep + 1}
                   </div>

                   <Button size="lg" onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
                       {currentStep === steps.length - 1 ? "Go to Dashboard" : "Next"}
                   </Button>

                    {currentStep < steps.length - 1 && (
                        <Button variant="link" onClick={handleSkip} className="mt-4 text-muted-foreground">
                           Skip for now
                        </Button>
                    )}
                </motion.div>
            </AnimatePresence>

             <div className="flex justify-center space-x-2 mt-8">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full ${index === currentStep ? 'bg-primary scale-125' : 'bg-muted'}`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: index === currentStep ? 1.25 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>

             <motion.div
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full filter blur-3xl opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             />
              <motion.div
                className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl opacity-60"
                 animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             />
        </div>
     );
   };

   export default OnboardingPage;
  