import { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Info, Download, RefreshCw, Sparkles, Settings, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
    isInfoOpen, 
    toggleInfo,
    isAdvancedMode,
    toggleAdvancedMode,
    advancedSettings,
    updateAdvancedSettings
  } = useStore();

  const [aspiration, setAspiration] = useState('');

  const handleSubmit = () => {
    if (aspiration.trim()) {
      startProcessing(aspiration);
    }
  };

  const handleDownload = () => {
    if (!mission) return;
    const text = `SERENDIPITY DISPENSED\n\n${mission.title.toUpperCase()}\n\n${mission.description}\n\n-- The Serendipity Dispenser`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `serendipity-${mission.id}.txt`;
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
        staggerChildren: 0.03,
        delayChildren: 0.5 
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, color: '#ffddaa' }, // Start glowing hot
    visible: { 
      opacity: 1, 
      color: '#3e2723', // Cool down to burnt wood color
      transition: { duration: 0.4 } 
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none font-cinzel">
      {/* HUD Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-auto z-50">
        <div className="p-2">
          <h1 className="text-2xl font-bold text-[#ffaa55] tracking-[0.2em] drop-shadow-[0_2px_10px_rgba(255,100,0,0.5)]">
            SERENDIPITY DISPENSER
          </h1>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ffaa55] to-transparent mt-1 opacity-50"></div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleAudio} className="bg-black/40 border-[#ffaa55]/30 text-[#ffaa55] hover:bg-[#ffaa55]/20 hover:text-[#ffddaa]">
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleInfo} className="bg-black/40 border-[#ffaa55]/30 text-[#ffaa55] hover:bg-[#ffaa55]/20 hover:text-[#ffddaa]">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Input Modal */}
      <Dialog open={isInputOpen} onOpenChange={setInputOpen}>
        <DialogContent className="bg-[#1a100a] border-[#ffaa55]/30 text-[#ffddaa] sm:max-w-[550px] pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-[#ffaa55] font-cinzel tracking-widest text-xl text-center border-b border-[#ffaa55]/20 pb-4">
              INITIATE SEQUENCE
            </DialogTitle>
            <DialogDescription className="text-[#ccaa88] font-rajdhani text-center pt-4 text-lg">
              Feed the machine your intention, and it will dispense a moment of unexpected magic.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <Textarea 
              placeholder="I wish to encounter..." 
              value={aspiration}
              onChange={(e) => setAspiration(e.target.value)}
              className="bg-black/40 border-[#5d4037] focus:border-[#ffaa55] text-[#ffddaa] font-rajdhani h-24 resize-none text-lg italic"
              maxLength={150}
            />

            <div className="flex items-center justify-between border-t border-[#ffaa55]/10 pt-4">
                <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-[#ffaa55]" />
                    <Label htmlFor="advanced-mode" className="text-[#ffaa55] font-cinzel text-sm tracking-wider">ADVANCED CALIBRATION</Label>
                </div>
                <Switch 
                    id="advanced-mode" 
                    checked={isAdvancedMode}
                    onCheckedChange={toggleAdvancedMode}
                    className="data-[state=checked]:bg-[#ffaa55] data-[state=unchecked]:bg-[#5d4037]"
                />
            </div>

            <AnimatePresence>
                {isAdvancedMode && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-6 overflow-hidden"
                    >
                        {/* Intensity Slider */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-rajdhani text-[#ccaa88] uppercase tracking-wider">
                                <span>Mild</span>
                                <span className="text-[#ffaa55]">Intensity</span>
                                <span>Wild</span>
                            </div>
                            <Slider 
                                value={[advancedSettings.intensity]} 
                                max={100} 
                                step={1} 
                                onValueChange={(val) => updateAdvancedSettings({ intensity: val[0] })}
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Social Slider */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-rajdhani text-[#ccaa88] uppercase tracking-wider">
                                <span>Solo Journey</span>
                                <span className="text-[#ffaa55]">Social Factor</span>
                                <span>Group Hug</span>
                            </div>
                            <Slider 
                                value={[advancedSettings.social]} 
                                max={100} 
                                step={1} 
                                onValueChange={(val) => updateAdvancedSettings({ social: val[0] })}
                                className="cursor-pointer"
                            />
                        </div>

                        {/* Weirdness Slider */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-rajdhani text-[#ccaa88] uppercase tracking-wider">
                                <span>Grounded</span>
                                <span className="text-[#ffaa55]">Absurdity</span>
                                <span>Surreal</span>
                            </div>
                            <Slider 
                                value={[advancedSettings.weirdness]} 
                                max={100} 
                                step={1} 
                                onValueChange={(val) => updateAdvancedSettings({ weirdness: val[0] })}
                                className="cursor-pointer"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

          </div>
          <div className="flex justify-center pt-2">
            <Button 
                onClick={handleSubmit} 
                disabled={!aspiration.trim()}
                className="bg-[#5d4037] hover:bg-[#8d6e63] text-[#ffddaa] font-cinzel tracking-widest border border-[#ffaa55]/50 shadow-[0_0_20px_rgba(255,170,85,0.2)] px-8 py-6 text-lg w-full sm:w-auto"
            >
              DISPENSE SERENDIPITY
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
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-40"
          >
            <div className="text-center">
                <div className="w-20 h-20 border-4 border-t-[#ffaa55] border-r-transparent border-b-[#ffaa55] border-l-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(255,170,85,0.4)]"></div>
                <motion.h2 
                    key={processingStep}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-3xl text-[#ffaa55] font-cinzel tracking-[0.2em]"
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
                  className="relative z-10 flex flex-col items-center h-full justify-center gap-4 max-w-[80%]"
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
                    Serendipity
                  </motion.h3>

                  {/* Title - Word-based rendering to prevent mid-word breaks */}
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 my-2">
                    {mission.title.split(' ').map((word, wordIndex) => (
                      <div key={`title-word-${wordIndex}`} className="flex">
                        {word.split('').map((char, charIndex) => (
                          <motion.span 
                            key={`title-${wordIndex}-${charIndex}`} 
                            variants={letterVariants}
                            className="font-cinzel text-2xl font-black text-[#3e2723] uppercase tracking-widest"
                            style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.1)' }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <motion.div variants={letterVariants} className="w-24 h-[2px] bg-[#5D4037]/40 my-2"></motion.div>

                  {/* Description - Word-based rendering */}
                  <div className="flex flex-wrap justify-center gap-x-[6px] gap-y-1">
                    {mission.description.split(' ').map((word, wordIndex) => (
                      <div key={`desc-word-${wordIndex}`} className="flex">
                        {word.split('').map((char, charIndex) => (
                          <motion.span 
                            key={`desc-${wordIndex}-${charIndex}`} 
                            variants={letterVariants}
                            className="font-cinzel text-lg font-bold text-[#4e342e] leading-relaxed"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
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
                  className="absolute left-0 right-0 h-[2px] bg-[#ffaa00] shadow-[0_0_20px_rgba(255,170,0,0.8)] z-20 pointer-events-none"
                />
              </div>

              {/* Close / Action Buttons - Outside the token */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4 w-full justify-center">
                 <Button 
                    onClick={handleDownload} 
                    className="bg-[#5D4037] hover:bg-[#3e2723] text-[#D7CCC8] border border-[#D7CCC8]/20 font-cinzel tracking-widest"
                  >
                    <Download className="mr-2 h-4 w-4" /> KEEP TOKEN
                 </Button>
                 <Button 
                    onClick={reset} 
                    variant="outline"
                    className="bg-black/50 hover:bg-black/70 text-white border-white/20 font-orbitron"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> NEW SPIN
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info / Philosophy Overlay */}
      <Dialog open={isInfoOpen} onOpenChange={toggleInfo}>
        <DialogContent className="bg-[#1a100a] border-[#ffaa55]/30 text-[#ffddaa] pointer-events-auto max-w-2xl">
            <DialogHeader>
                <DialogTitle className="font-cinzel text-[#ffaa55] text-2xl tracking-widest text-center mb-4">THE ART OF SERENDIPITY</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 font-rajdhani text-lg leading-relaxed p-2 overflow-y-auto max-h-[60vh]">
                <div className="border-l-2 border-[#ffaa55] pl-4">
                  <p className="italic text-[#ffcc00]">"Serendipity is not just luck. It is the intersection of preparation and openness."</p>
                </div>

                <p>
                  At Burning Man, serendipity is engineered through <strong>Immediacy</strong> and <strong>Gifting</strong>. By removing the barriers of commerce and default-world transactions, we create a fertile ground for impossible coincidences.
                </p>

                <h3 className="font-cinzel text-[#ffaa55] text-xl mt-4">HOW IT WORKS</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                   <div className="bg-[#5d4037]/20 p-4 rounded border border-[#ffaa55]/20">
                      <h4 className="font-bold text-[#ffaa55] mb-2">Say Yes</h4>
                      <p className="text-sm">To the adventure you didn't plan.</p>
                   </div>
                   <div className="bg-[#5d4037]/20 p-4 rounded border border-[#ffaa55]/20">
                      <h4 className="font-bold text-[#ffaa55] mb-2">Get Lost</h4>
                      <p className="text-sm">The best things happen when you don't know where you are.</p>
                   </div>
                   <div className="bg-[#5d4037]/20 p-4 rounded border border-[#ffaa55]/20">
                      <h4 className="font-bold text-[#ffaa55] mb-2">Engage</h4>
                      <p className="text-sm">Participate, don't just spectate.</p>
                   </div>
                </div>

                <p className="text-sm text-[#ffaa55]/70 text-center mt-4">
                  This machine is merely a catalyst. The magic requires YOU.
                </p>
            </div>
        </DialogContent>
      </Dialog>

      {/* Footer Hint */}
      {!isNearMachine && !mission && (
        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
            <p className="text-[#ffaa55]/50 font-cinzel tracking-[0.3em] text-sm animate-pulse">
                APPROACH THE DISPENSER
            </p>
        </div>
      )}
    </div>
  );
}
