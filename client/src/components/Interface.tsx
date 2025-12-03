import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Info, Download, RefreshCw, Sparkles, Settings, Send, ArrowLeft, Flame, Zap, BookOpen, X } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function Interface() {
  const { 
    activeMachine,
    setActiveMachine,
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
    updateAdvancedSettings,
    oracleChat,
    isOracleProcessing,
    sendOracleMessage,
    resetOracle,
    isTransmuting,
    transmuteBurden,
    transmutation,
    resetTemple
  } = useStore();

  const [aspiration, setAspiration] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [burdenInput, setBurdenInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [oracleChat]);

  const handleSubmit = () => {
    if (aspiration.trim()) {
      startProcessing(aspiration);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() && !isOracleProcessing) {
        sendOracleMessage(chatInput);
        setChatInput('');
    }
  };
  
  const handleBurdenSubmit = () => {
    if (burdenInput.trim()) {
        transmuteBurden(burdenInput);
        setBurdenInput('');
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.5 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, color: '#ffddaa' },
    visible: { 
      opacity: 1, 
      color: '#3e2723',
      transition: { duration: 0.4 } 
    }
  };
  
  const getTitle = () => {
    switch(activeMachine) {
        case 'oracle': return 'REFLECTIVE ORACLE';
        case 'temple': return 'TEMPLE OF TRANSMUTATION';
        default: return 'PLAYA ARTIFACTS';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none font-cinzel">
      {/* HUD Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-auto z-50">
        <div className="p-2">
          <h1 className="text-2xl font-bold text-white tracking-[0.2em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {getTitle()}
          </h1>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent mt-1 opacity-50"></div>
        </div>

        <div className="flex gap-2">
          <Link href="/about">
            <Button variant="outline" size="icon" className="bg-black/40 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <BookOpen className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="icon" onClick={toggleAudio} className="bg-black/40 border-white/30 text-white hover:bg-white/20 hover:text-white">
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleInfo} className="bg-black/40 border-white/30 text-white hover:bg-white/20 hover:text-white">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* ----- DISPENSER INTERFACE ----- */}
      <Dialog open={isInputOpen} onOpenChange={(open) => {
          setInputOpen(open);
          if (!open) setActiveMachine(null);
      }}>
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
                        {/* ... Sliders ... */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-rajdhani text-[#ccaa88] uppercase tracking-wider">
                                <span>Mild</span><span className="text-[#ffaa55]">Intensity</span><span>Wild</span>
                            </div>
                            <Slider value={[advancedSettings.intensity]} max={100} step={1} onValueChange={(val) => updateAdvancedSettings({ intensity: val[0] })} className="cursor-pointer"/>
                        </div>
                        {/* ... other sliders ... */}
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Button onClick={handleSubmit} disabled={!aspiration.trim()} className="bg-[#5d4037] hover:bg-[#8d6e63] text-[#ffddaa] font-cinzel tracking-widest border border-[#ffaa55]/50 shadow-[0_0_20px_rgba(255,170,85,0.2)] px-8 py-6 text-lg w-full">
              DISPENSE SERENDIPITY
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => { setInputOpen(false); setActiveMachine(null); }}
              className="text-[#8d6e63] hover:text-[#ffaa55] hover:bg-transparent font-cinzel text-sm tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> RETURN TO PLAYA
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Overlay */}
      <AnimatePresence>
        {processingStep && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-40">
            <div className="text-center">
                <div className="w-20 h-20 border-4 border-t-[#ffaa55] border-r-transparent border-b-[#ffaa55] border-l-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(255,170,85,0.4)]"></div>
                <motion.h2 key={processingStep} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="text-3xl text-[#ffaa55] font-cinzel tracking-[0.2em]">
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
             {/* Token Layout (Same as before) */}
             <div className="relative">
                {/* ... Token content ... */}
                <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full animate-pulse"></div>
                <div className="w-[500px] h-[500px] rounded-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[8px] border-[#5D4037] flex flex-col items-center justify-center p-12 text-center overflow-hidden" style={{ background: 'radial-gradient(circle, #D7CCC8 0%, #A1887F 100%)', boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.8)' }}>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, filter: 'contrast(150%) brightness(100%) sepia(100%)', mixBlendMode: 'multiply' }}></div>
                    <div className="absolute inset-4 rounded-full border-[2px] border-[#5D4037]/30 border-dashed"></div>
                    <div className="absolute inset-6 rounded-full border-[1px] border-[#5D4037]/20"></div>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 flex flex-col items-center h-full justify-center gap-4 max-w-[80%]">
                        <motion.div variants={letterVariants} className="text-[#3e2723]"><Sparkles className="w-8 h-8" strokeWidth={1.5} /></motion.div>
                        <motion.h3 variants={letterVariants} className="font-cinzel text-sm tracking-[0.3em] text-[#5D4037] font-bold uppercase">Serendipity</motion.h3>
                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 my-2">
                            {mission.title.split(' ').map((word, i) => (<div key={i} className="flex">{word.split('').map((char, j) => (<motion.span key={j} variants={letterVariants} className="font-cinzel text-2xl font-black text-[#3e2723] uppercase tracking-widest" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.1)' }}>{char}</motion.span>))}</div>))}
                        </div>
                        <motion.div variants={letterVariants} className="w-24 h-[2px] bg-[#5D4037]/40 my-2"></motion.div>
                        <div className="flex flex-wrap justify-center gap-x-[6px] gap-y-1">
                            {mission.description.split(' ').map((word, i) => (<div key={i} className="flex">{word.split('').map((char, j) => (<motion.span key={j} variants={letterVariants} className="font-cinzel text-lg font-bold text-[#4e342e] leading-relaxed">{char}</motion.span>))}</div>))}
                        </div>
                        <motion.div variants={letterVariants} className="mt-auto pt-6 font-mono text-[10px] text-[#5D4037]/60 tracking-widest">TOKEN_ID: {mission.id.toUpperCase()}</motion.div>
                    </motion.div>
                    <motion.div initial={{ top: '0%', opacity: 1 }} animate={{ top: '100%', opacity: 0 }} transition={{ duration: 2, ease: "linear" }} className="absolute left-0 right-0 h-[2px] bg-[#ffaa00] shadow-[0_0_20px_rgba(255,170,0,0.8)] z-20 pointer-events-none" />
                </div>
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                    <div className="flex gap-4 justify-center">
                        <Button onClick={handleDownload} className="bg-[#5D4037] hover:bg-[#3e2723] text-[#D7CCC8] border border-[#D7CCC8]/20 font-cinzel tracking-widest"><Download className="mr-2 h-4 w-4" /> KEEP TOKEN</Button>
                        <Button onClick={reset} variant="outline" className="bg-black/50 hover:bg-black/70 text-white border-white/20 font-orbitron"><RefreshCw className="mr-2 h-4 w-4" /> NEW SPIN</Button>
                    </div>
                    <Button onClick={reset} variant="ghost" className="text-white/50 hover:text-white hover:bg-transparent font-cinzel text-sm tracking-wider">
                        <ArrowLeft className="w-4 h-4 mr-2" /> RETURN TO PLAYA
                    </Button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----- ORACLE INTERFACE ----- */}
      <AnimatePresence>
        {activeMachine === 'oracle' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute right-0 top-0 bottom-0 w-full sm:w-[450px] bg-black/60 backdrop-blur-md border-l border-white/10 pointer-events-auto flex flex-col shadow-2xl z-40">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl text-cyan-300 font-cinzel tracking-widest">REFLECTIVE ORACLE</h2>
                    <Button variant="ghost" size="icon" onClick={resetOracle} className="text-white/50 hover:text-white hover:bg-white/10" data-testid="button-close-oracle">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {oracleChat.map((msg, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-lg text-sm font-rajdhani leading-relaxed ${msg.role === 'user' ? 'bg-cyan-900/40 border border-cyan-500/30 text-cyan-100' : 'bg-white/5 border border-white/10 text-gray-200 italic'}`}>{msg.content}</div>
                        </motion.div>
                    ))}
                    {isOracleProcessing && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                             <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex gap-1">
                                 <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                 <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                 <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                             </div>
                         </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10 bg-black/40">
                    <div className="flex gap-2">
                        <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Reflect..." className="bg-black/20 border-white/20 text-white font-rajdhani focus:border-cyan-400"/>
                        <Button type="submit" size="icon" disabled={!chatInput.trim() || isOracleProcessing} className="bg-cyan-700 hover:bg-cyan-600"><Send className="w-4 h-4" /></Button>
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={resetOracle}
                        className="w-full mt-3 text-white/40 hover:text-cyan-300 hover:bg-transparent font-cinzel text-sm tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> RETURN TO PLAYA
                    </Button>
                </form>
            </motion.div>
        )}
      </AnimatePresence>

      {/* ----- TEMPLE INTERFACE (UPDATED) ----- */}
      <AnimatePresence>
        {activeMachine === 'temple' && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center z-40 pointer-events-auto p-4"
            >
                <div className="w-full max-w-[600px] bg-[#1a0f0f] border border-[#5d4037] p-8 rounded-lg shadow-[0_0_80px_rgba(255,50,0,0.4)] text-center relative overflow-hidden">
                     {/* Background Fire Effect */}
                     <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-t from-red-900 to-transparent"></div>

                     {/* Close Button */}
                     <Button variant="ghost" size="icon" onClick={resetTemple} className="absolute top-4 right-4 text-[#8d6e63] hover:text-[#ff4400] hover:bg-transparent">
                         <X className="w-6 h-6" />
                     </Button>

                     <h2 className="text-3xl font-cinzel text-[#ff4400] mb-2 tracking-widest drop-shadow-md">TEMPLE OF TRANSMUTATION</h2>
                     
                     {!transmutation ? (
                         <>
                            <p className="text-[#8d6e63] font-rajdhani mb-8 text-lg">
                                The fire does not just destroy; it transforms. Offer your burden, and let the alchemy begin.
                            </p>

                            {isTransmuting ? (
                                <div className="py-12">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: -20, scale: 1.2 }}
                                        transition={{ duration: 2 }}
                                        className="text-[#ff4400] font-cinzel text-2xl font-bold flex flex-col items-center gap-4"
                                    >
                                        <Flame className="w-16 h-16 animate-pulse text-orange-500" />
                                        <span>PURIFYING...</span>
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <Textarea 
                                        value={burdenInput}
                                        onChange={(e) => setBurdenInput(e.target.value)}
                                        placeholder="I carry the weight of..."
                                        className="bg-black/30 border-[#3e2723] text-[#ffaa55] font-handwriting text-2xl h-40 focus:border-[#ff4400] resize-none text-center placeholder:text-[#5d4037] italic"
                                    />
                                    <Button 
                                        onClick={handleBurdenSubmit} 
                                        disabled={!burdenInput.trim()}
                                        className="w-full bg-[#3e2723] hover:bg-[#ff4400] text-[#ffddaa] hover:text-white font-cinzel tracking-widest py-8 text-xl transition-all duration-500"
                                    >
                                        <Zap className="w-5 h-5 mr-2" /> TRANSMUTE
                                    </Button>
                                </div>
                            )}
                         </>
                     ) : (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-6 space-y-8"
                         >
                             <div className="text-[#8d6e63] text-sm font-rajdhani uppercase tracking-widest mb-2">You Released</div>
                             <div className="text-[#5d4037] line-through text-xl italic">{transmutation.original}</div>
                             
                             <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff4400] to-transparent opacity-50"></div>
                             
                             <div className="space-y-4">
                                <div className="text-[#ffaa55] text-lg font-cinzel">{transmutation.insight}</div>
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-2xl md:text-3xl font-bold text-white font-cinzel leading-relaxed drop-shadow-[0_0_15px_rgba(255,100,0,0.8)]"
                                >
                                    "{transmutation.wisdom}"
                                </motion.div>
                             </div>

                             <div className="flex flex-col items-center gap-3 mt-8">
                                 <Button 
                                    onClick={() => { setTransmutation(null); setBurdenInput(''); }}
                                    variant="outline"
                                    className="border-[#ff4400]/30 text-[#ff4400] hover:bg-[#ff4400]/10"
                                 >
                                     OFFER ANOTHER
                                 </Button>
                                 <Button 
                                    onClick={resetTemple}
                                    variant="ghost"
                                    className="text-[#8d6e63] hover:text-[#ff4400] hover:bg-transparent font-cinzel text-sm tracking-wider"
                                 >
                                     <ArrowLeft className="w-4 h-4 mr-2" /> RETURN TO PLAYA
                                 </Button>
                             </div>
                         </motion.div>
                     )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Info Overlay (Same as before) */}
      <Dialog open={isInfoOpen} onOpenChange={toggleInfo}>
        <DialogContent className="bg-[#1a100a] border-[#ffaa55]/30 text-[#ffddaa] pointer-events-auto max-w-2xl">
            {/* ... Info content ... */}
            <DialogHeader>
                <DialogTitle className="font-cinzel text-[#ffaa55] text-2xl tracking-widest text-center mb-4">THE ART OF SERENDIPITY</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 font-rajdhani text-lg leading-relaxed p-2 overflow-y-auto max-h-[60vh]">
                {/* ... content ... */}
                <div className="border-l-2 border-[#ffaa55] pl-4"><p className="italic text-[#ffcc00]">"Serendipity is not just luck. It is the intersection of preparation and openness."</p></div>
                <p>At Burning Man, serendipity is engineered through <strong>Immediacy</strong> and <strong>Gifting</strong>. By removing the barriers of commerce and default-world transactions, we create a fertile ground for impossible coincidences.</p>
                <h3 className="font-cinzel text-[#ffaa55] text-xl mt-4">HOW IT WORKS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                   <div className="bg-[#5d4037]/20 p-4 rounded border border-[#ffaa55]/20"><h4 className="font-bold text-[#ffaa55] mb-2">Say Yes</h4><p className="text-sm">To the adventure you didn't plan.</p></div>
                   <div className="bg-[#5d4037]/20 p-4 rounded border border-[#ffaa55]/20"><h4 className="font-bold text-[#ffaa55] mb-2">Get Lost</h4><p className="text-sm">The best things happen when you don't know where you are.</p></div>
                   <div className="bg-[#5d4037]/20 p-4 rounded border border-[#ffaa55]/20"><h4 className="font-bold text-[#ffaa55] mb-2">Engage</h4><p className="text-sm">Participate, don't just spectate.</p></div>
                </div>
                <p className="text-sm text-[#ffaa55]/70 text-center mt-4">This machine is merely a catalyst. The magic requires YOU.</p>
            </div>
        </DialogContent>
      </Dialog>

      {/* Footer Hint */}
      {!activeMachine && !mission && (
        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
            <p className="text-white/70 font-cinzel tracking-[0.3em] text-sm animate-pulse bg-black/20 inline-block px-4 py-2 rounded backdrop-blur-sm">
                CHOOSE YOUR PATH: DISPENSER, ORACLE, OR TEMPLE
            </p>
        </div>
      )}
    </div>
  );
}
