import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Flame, ChevronRight, ArrowLeft, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tutorialSteps = [
  {
    title: 'Welcome to the Playa',
    description: 'You stand in a digital desert, inspired by Black Rock City. Three sacred artifacts await your interaction, each powered by AI to create unique, personalized experiences.',
    icon: Sparkles,
    color: '#ffaa55'
  },
  {
    title: 'The Serendipity Dispenser',
    description: 'Click the golden obelisk to receive a mission. Tell it what you seek—adventure, connection, or transformation—and it will dispense a unique directive calibrated to your spirit.',
    icon: Sparkles,
    color: '#ffaa55'
  },
  {
    title: 'The Reflective Oracle',
    description: 'The chrome cube doesn\'t give answers—it asks questions. Share your thoughts and receive reflections that reveal what you already know but haven\'t yet admitted.',
    icon: Eye,
    color: '#22d3ee'
  },
  {
    title: 'The Temple of Transmutation',
    description: 'Offer your burdens to the sacred fire. The Temple transforms what weighs you down into wisdom and strength. Fear becomes curiosity. Anger becomes passion.',
    icon: Flame,
    color: '#f97316'
  },
  {
    title: 'Begin Your Journey',
    description: 'Each interaction is unique—generated in real-time by AI. There are no wrong answers, only discoveries. Click any artifact to begin.',
    icon: Sparkles,
    color: '#ffaa55'
  }
];

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Tutorial({ isOpen, onClose }: TutorialProps) {
  const [step, setStep] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        setStep(0);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      modalRef.current?.focus();
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
      setStep(0);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    onClose();
    setStep(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 pointer-events-auto"
          onClick={handleClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tutorial-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-[#2a1a10] to-[#1a0f0a] border border-[#ffaa55]/30 rounded-xl max-w-lg w-full p-6 sm:p-8 relative focus:outline-none"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ffaa55] rounded"
              data-testid="button-close-tutorial"
              aria-label="Close tutorial"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {tutorialSteps.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setStep(idx)}
                  className={`h-2 rounded-full transition-all ${idx === step ? 'bg-[#ffaa55] w-6' : 'bg-white/20 w-2 hover:bg-white/40'}`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${tutorialSteps[step].color}20` }}
              >
                {(() => {
                  const Icon = tutorialSteps[step].icon;
                  return <Icon className="w-8 h-8" style={{ color: tutorialSteps[step].color }} aria-hidden="true" />;
                })()}
              </div>
              <h3 id="tutorial-title" className="text-xl sm:text-2xl font-cinzel text-[#ffaa55] mb-4 tracking-wider">
                {tutorialSteps[step].title}
              </h3>
              <p className="text-[#ccaa88] font-rajdhani text-base sm:text-lg leading-relaxed">
                {tutorialSteps[step].description}
              </p>
            </motion.div>

            <div className="flex justify-between items-center mt-8">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 0}
                className="text-white/50 hover:text-white disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <span className="text-[#8d6e63] text-sm font-rajdhani">
                {step + 1} / {tutorialSteps.length}
              </span>
              <Button
                onClick={nextStep}
                className="bg-[#ffaa55] hover:bg-[#ffcc00] text-[#1a0f0a] font-cinzel"
                data-testid="button-tutorial-next"
              >
                {step === tutorialSteps.length - 1 ? 'Begin' : 'Next'} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TutorialButtonProps {
  onClick: () => void;
  variant?: 'header' | 'floating';
}

export function TutorialButton({ onClick, variant = 'header' }: TutorialButtonProps) {
  if (variant === 'floating') {
    return (
      <Button 
        onClick={onClick}
        className="bg-[#ffaa55]/20 hover:bg-[#ffaa55]/40 text-[#ffaa55] border border-[#ffaa55]/30 backdrop-blur-sm font-cinzel tracking-wider"
        data-testid="button-tutorial-floating"
      >
        <HelpCircle className="w-4 h-4 mr-2" /> First Time Here?
      </Button>
    );
  }
  
  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      className="bg-black/40 border-[#ffaa55]/30 text-[#ffaa55] hover:bg-[#ffaa55]/20 hover:text-white"
      data-testid="button-tutorial"
    >
      <HelpCircle className="w-4 h-4 mr-2" /> First Time Here?
    </Button>
  );
}
