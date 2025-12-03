import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, HelpCircle, X, Download, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function Interface() {
  const { 
    isNearMachine, 
    isInputOpen, 
    setInputOpen, 
    startProcessing, 
    processingStep, 
    mission, 
    reset, 
    audioEnabled, 
    toggleAudio, 
    isHelpOpen, 
    toggleHelp 
  } = useStore();

  const [aspiration, setAspiration] = useState('');

  const handleSubmit = () => {
    if (aspiration.trim()) {
      startProcessing(aspiration);
    }
  };

  const handleDownload = () => {
    if (!mission) return;
    const text = `DIVINE MANDATE\n\n${mission.title.toUpperCase()}\n\n${mission.description}\n\n-- The Oracle`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `god-token-${mission.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Animation variants for the laser etching effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.5 
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, color: '#ffddaa' }, // Start glowing hot
    visible: { 
      opacity: 1, 
      color: '#3e2723', // Cool down to burnt wood color
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* HUD Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-auto z-50">
        <div className="backdrop-blur-sm bg-black/20 p-2 rounded border border-white/10">
          <h1 className="text-2xl font-bold text-white tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            SERENDIPITY ORACLE
          </h1>
          <p className="text-xs text-cyan-200/60 font-mono">SYS.VER.3.0 // ONLINE</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleAudio} className="bg-black/40 border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-200">
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleHelp} className="bg-black/40 border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-200">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Input Modal */}
      <Dialog open={isInputOpen} onOpenChange={setInputOpen}>
        <DialogContent className="bg-black/90 border-cyan-500/50 text-white sm:max-w-[425px] pointer-events-auto backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 font-orbitron tracking-wider">COMMUNE WITH THE ORACLE</DialogTitle>
            <DialogDescription className="text-cyan-100/60 font-rajdhani">
              State your current aspiration. The machine will etch your fate.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea 
              placeholder="I seek to find beauty in the mundane..." 
              value={aspiration}
              onChange={(e) => setAspiration(e.target.value)}
              className="bg-black/50 border-cyan-800 focus:border-cyan-400 text-cyan-100 font-rajdhani h-32 resize-none"
              maxLength={150}
            />
            <div className="flex justify-between items-center text-xs text-cyan-500/50">
                <span>{aspiration.length}/150 CHARS</span>
                <span>NEURAL LINK ACTIVE</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
                onClick={handleSubmit} 
                disabled={!aspiration.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron tracking-widest border border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              INITIATE SEQUENCE
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Overlay */}
      <AnimatePresence>
        {processingStep && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40"
          >
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <motion.h2 
                    key={processingStep}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-2xl text-cyan-400 font-orbitron tracking-widest"
                >
                    {processingStep}
                </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE GOD TOKEN */}
      <AnimatePresence>
        {mission && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto p-4"
          >
            <div className="relative">
              {/* Glow Effect behind token */}
              <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full animate-pulse"></div>
              
              {/* The Token Itself */}
              <div 
                className="w-[500px] h-[500px] rounded-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[8px] border-[#5D4037] flex flex-col items-center justify-center p-12 text-center overflow-hidden"
                style={{
                  background: 'radial-gradient(circle, #D7CCC8 0%, #A1887F 100%)', // Wood/Parchment Tone
                  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.8)'
                }}
              >
                {/* Wood Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  filter: 'contrast(150%) brightness(100%) sepia(100%)',
                  mixBlendMode: 'multiply'
                }}></div>

                {/* Decorative Ring */}
                <div className="absolute inset-4 rounded-full border-[2px] border-[#5D4037]/30 border-dashed"></div>
                <div className="absolute inset-6 rounded-full border-[1px] border-[#5D4037]/20"></div>

                {/* Content */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative z-10 flex flex-col items-center h-full justify-center gap-4"
                >
                  {/* Top Icon/Symbol */}
                  <motion.div variants={letterVariants} className="text-[#3e2723]">
                    <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                  </motion.div>

                  {/* Header */}
                  <motion.h3 
                    variants={letterVariants}
                    className="font-cinzel text-sm tracking-[0.3em] text-[#5D4037] font-bold uppercase"
                  >
                    Divine Mandate
                  </motion.h3>

                  {/* Title */}
                  <div className="flex flex-wrap justify-center gap-1 my-2">
                    {mission.title.split('').map((char, i) => (
                      <motion.span 
                        key={`title-${i}`} 
                        variants={letterVariants}
                        className="font-cinzel text-2xl font-black text-[#3e2723] uppercase tracking-widest"
                        style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.1)' }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>

                  {/* Divider */}
                  <motion.div variants={letterVariants} className="w-24 h-[2px] bg-[#5D4037]/40 my-2"></motion.div>

                  {/* Description - The Core Message */}
                  <div className="flex flex-wrap justify-center gap-[2px]">
                    {mission.description.split('').map((char, i) => (
                      <motion.span 
                        key={`desc-${i}`} 
                        variants={letterVariants}
                        className="font-cinzel text-lg font-bold text-[#4e342e] leading-relaxed"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>

                  {/* Footer ID */}
                  <motion.div 
                    variants={letterVariants}
                    className="mt-auto pt-6 font-mono text-[10px] text-[#5D4037]/60 tracking-widest"
                  >
                    TOKEN_ID: {mission.id.toUpperCase()} // {mission.category.toUpperCase()}
                  </motion.div>
                </motion.div>

                {/* Laser Etching Beam Effect */}
                <motion.div 
                  initial={{ top: '0%', opacity: 1 }}
                  animate={{ top: '100%', opacity: 0 }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20 pointer-events-none"
                />
              </div>

              {/* Close / Action Buttons - Outside the token */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4 w-full justify-center">
                 <Button 
                    onClick={handleDownload} 
                    className="bg-[#5D4037] hover:bg-[#3e2723] text-[#D7CCC8] border border-[#D7CCC8]/20 font-cinzel tracking-widest"
                  >
                    <Download className="mr-2 h-4 w-4" /> CLAIM TOKEN
                 </Button>
                 <Button 
                    onClick={reset} 
                    variant="outline"
                    className="bg-black/50 hover:bg-black/70 text-white border-white/20 font-orbitron"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> DISCARD
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Overlay */}
      <Dialog open={isHelpOpen} onOpenChange={toggleHelp}>
        <DialogContent className="bg-black/95 border-cyan-900 text-white pointer-events-auto">
            <DialogHeader>
                <DialogTitle className="font-orbitron text-cyan-400">OPERATIONAL GUIDE</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 font-rajdhani text-lg">
                <p>1. Drag to explore the desert environment.</p>
                <p>2. Click the Floating Monolith to commune with the Oracle.</p>
                <p>3. Offer your aspiration to the machine.</p>
                <p>4. Receive a Divine Token etched with your serendipity mission.</p>
            </div>
        </DialogContent>
      </Dialog>

      {/* Footer Hint */}
      {!isNearMachine && !mission && (
        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
            <p className="text-cyan-200/50 font-orbitron tracking-[0.2em] text-sm animate-pulse">
                APPROACH THE MACHINE
            </p>
        </div>
      )}
    </div>
  );
}
