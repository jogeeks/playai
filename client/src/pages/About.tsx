import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Sparkles, Eye, Flame, ChevronDown, HelpCircle, X, ChevronRight, BookOpen, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const artifacts = [
  { id: 'dispenser', name: 'Dispenser', fullName: 'Serendipity Dispenser', icon: Sparkles, color: '#ffaa55', hoverTitle: 'Transform intention into adventure' },
  { id: 'oracle', name: 'Oracle', fullName: 'Reflective Oracle', icon: Eye, color: '#22d3ee', hoverTitle: 'Questions that illuminate your path' },
  { id: 'temple', name: 'Temple', fullName: 'Temple of Transmutation', icon: Flame, color: '#f97316', hoverTitle: 'Transmute burdens into wisdom' },
  { id: 'lore', name: 'Lore', fullName: 'History & Lore', icon: History, color: '#a855f7', hoverTitle: 'The story behind the artifacts' },
];

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

export function About() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const tutorialButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTutorial) {
        setShowTutorial(false);
        setTutorialStep(0);
        tutorialButtonRef.current?.focus();
      }
    };
    
    if (showTutorial) {
      document.addEventListener('keydown', handleEscape);
      modalRef.current?.focus();
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showTutorial]);

  const closeTutorial = () => {
    setShowTutorial(false);
    setTutorialStep(0);
    tutorialButtonRef.current?.focus();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
      setTutorialStep(0);
    }
  };

  const prevTutorialStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a0f0a] via-[#2a1a10] to-[#1a0f0a] text-[#ffddaa] font-cinzel overflow-y-auto overflow-x-hidden">
        
        {/* Quick Navigation - Fixed */}
        <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3" aria-label="Quick navigation">
          {artifacts.map((artifact) => (
            <Tooltip key={artifact.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => scrollToSection(artifact.id)}
                  className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-[#ffaa55] focus:ring-offset-2 focus:ring-offset-black"
                  style={{ '--artifact-color': artifact.color } as React.CSSProperties}
                  data-testid={`nav-${artifact.id}`}
                  aria-label={`Jump to ${artifact.fullName}`}
                >
                  <artifact.icon 
                    className="w-5 h-5 transition-colors" 
                    style={{ color: artifact.color }}
                    aria-hidden="true"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-black/90 border-white/20 text-white font-rajdhani">
                <p className="font-bold" style={{ color: artifact.color }}>{artifact.name}</p>
                <p className="text-xs text-gray-400">{artifact.hoverTitle}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Mobile Quick Nav */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden flex gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10" aria-label="Quick navigation">
          {artifacts.map((artifact) => (
            <button
              key={artifact.id}
              onClick={() => scrollToSection(artifact.id)}
              className="p-2 rounded-full hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#ffaa55]"
              data-testid={`nav-mobile-${artifact.id}`}
              aria-label={`Jump to ${artifact.fullName}`}
            >
              <artifact.icon className="w-4 h-4" style={{ color: artifact.color }} aria-hidden="true" />
            </button>
          ))}
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-[#ffaa55] hover:text-white hover:bg-white/10" data-testid="button-return-playa">
                <ArrowLeft className="w-4 h-4 mr-2" /> Return to the Playa
              </Button>
            </Link>
            <Button 
              ref={tutorialButtonRef}
              variant="outline" 
              onClick={() => setShowTutorial(true)}
              className="bg-black/40 border-[#ffaa55]/30 text-[#ffaa55] hover:bg-[#ffaa55]/20 hover:text-white"
              data-testid="button-tutorial"
            >
              <HelpCircle className="w-4 h-4 mr-2" /> First Time Here?
            </Button>
          </div>

          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffaa55] tracking-widest mb-4" data-testid="text-page-title">
              THE PLAYA ARTIFACTS
            </h1>
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#ffaa55] to-transparent mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-[#ccaa88] font-rajdhani max-w-2xl mx-auto px-4">
              Three interactive art installations powered by artificial intelligence, designed to catalyze serendipity, reflection, and transformation on the Playa.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
              className="mt-8 text-[#ffaa55]/50"
            >
              <ChevronDown className="w-6 h-6 mx-auto" />
            </motion.div>
          </motion.header>

          <div className="space-y-12 sm:space-y-16">
            {/* DISPENSER */}
            <motion.section 
              id="dispenser"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gradient-to-r from-[#3e2723]/50 to-transparent p-6 sm:p-8 rounded-lg border-l-4 border-[#ffaa55] scroll-mt-20"
              data-testid="section-dispenser"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 cursor-help">
                    <div className="p-3 sm:p-4 bg-[#ffaa55]/20 rounded-full shrink-0 hover:bg-[#ffaa55]/30 transition-colors">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffaa55]" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ffaa55] mb-2 tracking-wider">
                        THE SERENDIPITY DISPENSER
                      </h2>
                      <p className="text-xs sm:text-sm text-[#8d6e63] uppercase tracking-widest mb-4">Future • Action • Possibility</p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-[#ffaa55] text-[#1a0f0a] font-rajdhani text-sm max-w-xs">
                  <p className="font-bold">Transform intention into adventure</p>
                  <p className="text-xs opacity-80">Click the golden obelisk in the 3D scene to begin</p>
                </TooltipContent>
              </Tooltip>
              <div className="sm:ml-16 mt-4">
                <div className="space-y-4 font-rajdhani text-base sm:text-lg leading-relaxed">
                  <p>
                    A towering obelisk wrapped in sacred geometry, pulsing with golden light. The Dispenser is a catalyst for the unexpected—a machine that transforms intention into adventure.
                  </p>
                  <p>
                    Approach the artifact, offer your aspiration, and receive a unique mission generated by AI. Each directive is crafted in real-time, calibrated to your desired level of intensity, social engagement, and absurdity.
                  </p>
                  <p className="text-[#ffaa55] italic border-l-2 border-[#ffaa55]/30 pl-4">
                    "Serendipity is not random. It is the universe responding to your openness."
                  </p>
                </div>
                <div className="mt-6 p-4 bg-black/30 rounded border border-[#ffaa55]/20">
                  <h4 className="text-sm text-[#ffaa55] uppercase tracking-widest mb-3">How It Works</h4>
                  <ol className="list-decimal list-inside text-sm font-rajdhani text-[#ccaa88] space-y-2">
                    <li>Click the golden obelisk to begin</li>
                    <li>Enter what you seek or wish to experience</li>
                    <li>Adjust the calibration sliders (optional)</li>
                    <li>Receive your AI-generated mission on a sacred token</li>
                  </ol>
                </div>
              </div>
            </motion.section>

            {/* ORACLE */}
            <motion.section 
              id="oracle"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gradient-to-l from-[#004d5e]/30 to-transparent p-6 sm:p-8 rounded-lg border-r-4 border-cyan-400 scroll-mt-20"
              data-testid="section-oracle"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col sm:flex-row-reverse items-start gap-4 sm:gap-6 cursor-help">
                    <div className="p-3 sm:p-4 bg-cyan-400/20 rounded-full shrink-0 hover:bg-cyan-400/30 transition-colors">
                      <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                    </div>
                    <div className="sm:text-right">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-2 tracking-wider">
                        THE REFLECTIVE ORACLE
                      </h2>
                      <p className="text-xs sm:text-sm text-cyan-700 uppercase tracking-widest mb-4">Present • Self • Clarity</p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-cyan-400 text-[#1a0f0a] font-rajdhani text-sm max-w-xs">
                  <p className="font-bold">Questions that illuminate your path</p>
                  <p className="text-xs opacity-80">Click the reflective cube in the 3D scene to begin</p>
                </TooltipContent>
              </Tooltip>
              <div className="sm:mr-16 mt-4">
                <div className="space-y-4 font-rajdhani text-base sm:text-lg leading-relaxed">
                  <p>
                    A floating chrome cube, impossibly reflective, rotating slowly in the desert air. The Oracle does not give answers—it asks questions that you didn't know you needed to hear.
                  </p>
                  <p>
                    Engage in a dialogue with the mirror. Speak your thoughts, and the AI will respond not with solutions, but with reflections that cut to the heart of your assumptions and desires.
                  </p>
                  <p className="text-cyan-400 italic border-l-2 border-cyan-400/30 pl-4">
                    "The mirror shows only what you bring to it. Look closer."
                  </p>
                </div>
                <div className="mt-6 p-4 bg-black/30 rounded border border-cyan-400/20">
                  <h4 className="text-sm text-cyan-400 uppercase tracking-widest mb-3">How It Works</h4>
                  <ol className="list-decimal list-inside text-sm font-rajdhani text-[#ccaa88] space-y-2">
                    <li>Click the reflective cube to begin</li>
                    <li>Share your thoughts, feelings, or questions</li>
                    <li>Receive a thought-provoking question in return</li>
                    <li>Continue the dialogue as long as you wish</li>
                  </ol>
                </div>
              </div>
            </motion.section>

            {/* TEMPLE */}
            <motion.section 
              id="temple"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-gradient-to-r from-[#5d1a1a]/30 to-transparent p-6 sm:p-8 rounded-lg border-l-4 border-orange-500 scroll-mt-20"
              data-testid="section-temple"
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 cursor-help">
                    <div className="p-3 sm:p-4 bg-orange-500/20 rounded-full shrink-0 hover:bg-orange-500/30 transition-colors">
                      <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-2 tracking-wider">
                        THE TEMPLE OF TRANSMUTATION
                      </h2>
                      <p className="text-xs sm:text-sm text-orange-800 uppercase tracking-widest mb-4">Past • Release • Alchemy</p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-orange-500 text-white font-rajdhani text-sm max-w-xs">
                  <p className="font-bold">Transmute burdens into wisdom</p>
                  <p className="text-xs opacity-80">Click the golden lantern in the 3D scene to begin</p>
                </TooltipContent>
              </Tooltip>
              <div className="sm:ml-16 mt-4">
                <div className="space-y-4 font-rajdhani text-base sm:text-lg leading-relaxed">
                  <p>
                    A sacred geometry lantern of golden light, its rings spinning like the orbits of celestial bodies. The Temple is not about destruction—it is about transformation.
                  </p>
                  <p>
                    Offer your burden to the fire. The AI will acknowledge your weight with compassion, then transmute it into wisdom. Your fear becomes curiosity. Your anger becomes passion. Your sorrow becomes depth.
                  </p>
                  <p className="text-orange-400 italic border-l-2 border-orange-400/30 pl-4">
                    "The fire does not destroy. It reveals what was gold all along."
                  </p>
                </div>
                <div className="mt-6 p-4 bg-black/30 rounded border border-orange-500/20">
                  <h4 className="text-sm text-orange-500 uppercase tracking-widest mb-3">How It Works</h4>
                  <ol className="list-decimal list-inside text-sm font-rajdhani text-[#ccaa88] space-y-2">
                    <li>Click the golden lantern to enter</li>
                    <li>Write down what you wish to release</li>
                    <li>Watch as it is transmuted in the alchemical fire</li>
                    <li>Receive wisdom that reframes your burden as strength</li>
                  </ol>
                </div>
              </div>
            </motion.section>

            {/* HISTORY / LORE SECTION */}
            <motion.section 
              id="lore"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-b from-purple-900/20 to-transparent p-6 sm:p-8 rounded-lg border border-purple-500/30 scroll-mt-20"
              data-testid="section-lore"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 bg-purple-500/20 rounded-full shrink-0">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-1 tracking-wider">
                    THE LORE
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-700 uppercase tracking-widest">Origin • Inspiration • Purpose</p>
                </div>
              </div>
              
              <div className="space-y-8 font-rajdhani text-base sm:text-lg leading-relaxed">
                <div className="space-y-4">
                  <h3 className="text-lg text-purple-300 font-cinzel tracking-wider">The Birth of Sacred Technology</h3>
                  <p>
                    In the alkaline dust of Black Rock Desert, where reality bends and impossible things become possible, a question emerged: <em>What if technology could serve the soul instead of distract from it?</em>
                  </p>
                  <p>
                    The Playa Artifacts were born from this question—a fusion of ancient wisdom traditions and cutting-edge AI. They exist at the intersection of the sacred and the digital, proving that technology, when wielded with intention, can become a vehicle for transformation.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#ffaa55]/10 p-4 rounded-lg border border-[#ffaa55]/20">
                    <h4 className="text-[#ffaa55] font-cinzel text-sm mb-2">The Dispenser</h4>
                    <p className="text-sm text-[#ccaa88]">
                      Inspired by the "gift economy" of Burning Man, where strangers offer experiences instead of goods. The AI became the ultimate gifter—one who could offer tailored adventures to any soul.
                    </p>
                  </div>
                  <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                    <h4 className="text-cyan-400 font-cinzel text-sm mb-2">The Oracle</h4>
                    <p className="text-sm text-[#ccaa88]">
                      Modeled after the Socratic tradition—wisdom through questions, not answers. The chrome cube reflects your words back at you, revealing truths you already carried but couldn't see.
                    </p>
                  </div>
                  <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                    <h4 className="text-orange-400 font-cinzel text-sm mb-2">The Temple</h4>
                    <p className="text-sm text-[#ccaa88]">
                      Drawn from the tradition of the Temple Burn—the moment when thousands release their grief to the flames. This digital hearth offers private transmutation for individual souls.
                    </p>
                  </div>
                </div>

                <div className="border-t border-purple-500/20 pt-6 mt-6">
                  <h3 className="text-lg text-purple-300 font-cinzel tracking-wider mb-4">Why AI?</h3>
                  <p>
                    The human facilitators at Burning Man—the artists, the healers, the strangers who share wisdom at 3am—cannot scale. But their essence can. AI, trained on the patterns of human wisdom, becomes a tireless companion that never sleeps, never judges, and always meets you where you are.
                  </p>
                  <p className="mt-4 text-purple-400 italic border-l-2 border-purple-400/30 pl-4">
                    "We didn't create artificial intelligence. We created artificial compassion—a mirror that reflects not what you look like, but what you're becoming."
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 sm:mt-20 text-center border-t border-[#ffaa55]/20 pt-10 sm:pt-12 pb-20 md:pb-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#ffaa55] mb-4">THE 10 PRINCIPLES</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto mb-8 px-2">
              {[
                'Radical Inclusion',
                'Gifting',
                'Decommodification',
                'Radical Self-reliance',
                'Radical Self-expression',
                'Communal Effort',
                'Civic Responsibility',
                'Leaving No Trace',
                'Participation',
                'Immediacy'
              ].map((principle) => (
                <div key={principle} className="bg-[#3e2723]/30 px-2 py-2 rounded text-xs font-rajdhani text-[#ccaa88] border border-[#ffaa55]/10">
                  {principle}
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-[#3e2723]/30 rounded-lg border border-[#ffaa55]/10 max-w-xl mx-auto">
              <p className="text-sm text-[#8d6e63] uppercase tracking-widest mb-2">Powered By</p>
              <p className="text-[#ffaa55] font-bold text-lg">Claude AI</p>
              <p className="text-xs text-[#8d6e63] mt-2 font-rajdhani">
                Each interaction is uniquely generated by artificial intelligence, 
                ensuring no two experiences are ever the same.
              </p>
            </div>

            <div className="mt-10 sm:mt-12">
              <Link href="/">
                <Button className="bg-[#ffaa55] hover:bg-[#ffcc00] text-[#1a0f0a] font-cinzel tracking-widest px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg" data-testid="button-enter-experience">
                  ENTER THE EXPERIENCE
                </Button>
              </Link>
            </div>
          </motion.footer>
        </div>

        {/* Tutorial Modal */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
              onClick={closeTutorial}
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
                  onClick={closeTutorial}
                  className="absolute top-4 right-4 text-white/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ffaa55] rounded"
                  data-testid="button-close-tutorial"
                  aria-label="Close tutorial"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {tutorialSteps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${idx === tutorialStep ? 'bg-[#ffaa55] w-6' : 'bg-white/20'}`}
                    />
                  ))}
                </div>

                <motion.div
                  key={tutorialStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ backgroundColor: `${tutorialSteps[tutorialStep].color}20` }}
                  >
                    {(() => {
                      const Icon = tutorialSteps[tutorialStep].icon;
                      return <Icon className="w-8 h-8" style={{ color: tutorialSteps[tutorialStep].color }} />;
                    })()}
                  </div>
                  <h3 id="tutorial-title" className="text-xl sm:text-2xl font-cinzel text-[#ffaa55] mb-4 tracking-wider">
                    {tutorialSteps[tutorialStep].title}
                  </h3>
                  <p className="text-[#ccaa88] font-rajdhani text-base sm:text-lg leading-relaxed">
                    {tutorialSteps[tutorialStep].description}
                  </p>
                </motion.div>

                <div className="flex justify-between items-center mt-8">
                  <Button
                    variant="ghost"
                    onClick={prevTutorialStep}
                    disabled={tutorialStep === 0}
                    className="text-white/50 hover:text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <span className="text-[#8d6e63] text-sm font-rajdhani">
                    {tutorialStep + 1} / {tutorialSteps.length}
                  </span>
                  <Button
                    onClick={nextTutorialStep}
                    className="bg-[#ffaa55] hover:bg-[#ffcc00] text-[#1a0f0a] font-cinzel"
                  >
                    {tutorialStep === tutorialSteps.length - 1 ? 'Begin' : 'Next'} <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
