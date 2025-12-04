import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type MissionCategory = 'Connection' | 'Creativity' | 'Adventure' | 'Learning' | 'Self-Discovery';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  color: string;
}

interface AdvancedSettings {
  intensity: number;
  social: number;
  weirdness: number;
}

interface ChatMessage {
  role: 'oracle' | 'user';
  content: string;
}

interface Transmutation {
  original: string;
  insight: string;
  wisdom: string;
}

interface State {
  activeMachine: 'dispenser' | 'oracle' | 'temple' | null;
  
  // Dispenser State
  isInputOpen: boolean;
  processingStep: string | null;
  mission: Mission | null;
  advancedSettings: AdvancedSettings;
  isAdvancedMode: boolean;

  // Oracle State
  oracleChat: ChatMessage[];
  isOracleProcessing: boolean;

  // Temple State
  isTransmuting: boolean;
  transmutation: Transmutation | null;

  // Global State
  audioEnabled: boolean;
  isInfoOpen: boolean;

  // Actions
  setActiveMachine: (machine: 'dispenser' | 'oracle' | 'temple' | null) => void;
  setInputOpen: (open: boolean) => void;
  
  // Dispenser Actions
  startProcessing: (aspiration: string) => Promise<void>;
  reset: () => void;
  toggleAdvancedMode: () => void;
  updateAdvancedSettings: (settings: Partial<AdvancedSettings>) => void;

  // Oracle Actions
  sendOracleMessage: (message: string) => Promise<void>;
  resetOracle: () => void;

  // Temple Actions
  transmuteBurden: (burden: string) => Promise<void>;
  resetTemple: () => void;
  clearTransmutation: () => void;

  // Global Actions
  toggleAudio: () => void;
  toggleInfo: () => void;
}

const DISPENSER_STEPS = [
  "Calibrating serendipity sensors...",
  "Scanning Playa vibes...",
  "Injecting controlled chaos...",
  "Aligning with the dust...",
  "Manifesting opportunity...",
  "Dispensing serendipity!"
];

export const useStore = create(
  subscribeWithSelector<State>((set, get) => ({
    activeMachine: null,
    isInputOpen: false,
    processingStep: null,
    mission: null,
    audioEnabled: true,
    isInfoOpen: false,
    isAdvancedMode: false,
    advancedSettings: {
      intensity: 50,
      social: 50,
      weirdness: 50
    },
    oracleChat: [{ role: 'oracle', content: "I am the Reflective Oracle. I see what you hide. Speak." }],
    isOracleProcessing: false,
    
    isTransmuting: false,
    transmutation: null,

    setActiveMachine: (machine) => set({ 
        activeMachine: machine, 
        isInputOpen: machine === 'dispenser',
        isInfoOpen: false
    }),
    
    setInputOpen: (open) => set({ isInputOpen: open }),

    startProcessing: async (aspiration) => {
      set({ isInputOpen: false, processingStep: DISPENSER_STEPS[0] });
      
      // Animate through steps
      for (let i = 1; i < DISPENSER_STEPS.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ processingStep: DISPENSER_STEPS[i] });
      }

      try {
        const response = await fetch('/api/dispenser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            aspiration, 
            settings: get().advancedSettings 
          })
        });

        if (!response.ok) throw new Error('Failed to generate mission');
        
        const data = await response.json();
        set({ processingStep: null, mission: data.mission });
      } catch (error) {
        console.error('Dispenser error:', error);
        set({ processingStep: null });
      }
    },

    reset: () => set({ mission: null, activeMachine: null, processingStep: null }),

    sendOracleMessage: async (message) => {
        const currentChat = get().oracleChat;
        set((state) => ({ 
            oracleChat: [...state.oracleChat, { role: 'user', content: message }],
            isOracleProcessing: true 
        }));

        try {
          const response = await fetch('/api/oracle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              message, 
              history: currentChat 
            })
          });

          if (!response.ok) throw new Error('Failed to get oracle response');
          
          const data = await response.json();
          
          set((state) => ({
              oracleChat: [...state.oracleChat, { role: 'oracle', content: data.response }],
              isOracleProcessing: false
          }));
        } catch (error) {
          console.error('Oracle error:', error);
          set({ isOracleProcessing: false });
        }
    },

    resetOracle: () => set({ 
        oracleChat: [{ role: 'oracle', content: "I am the Reflective Oracle. I see what you hide. Speak." }],
        activeMachine: null
    }),

    transmuteBurden: async (burden) => {
      set({ isTransmuting: true });
      
      // Simulate alchemy time
      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        const response = await fetch('/api/temple', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ burden })
        });

        if (!response.ok) throw new Error('Failed to transmute burden');
        
        const data = await response.json();
        set({ 
          isTransmuting: false, 
          transmutation: data.transmutation
        });
      } catch (error) {
        console.error('Temple error:', error);
        set({ isTransmuting: false });
      }
    },

    resetTemple: () => set({ transmutation: null, activeMachine: null }),
    clearTransmutation: () => set({ transmutation: null }),

    toggleAdvancedMode: () => set((state) => ({ isAdvancedMode: !state.isAdvancedMode })),
    updateAdvancedSettings: (settings) => set((state) => ({ 
      advancedSettings: { ...state.advancedSettings, ...settings } 
    })),

    toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
    toggleInfo: () => set((state) => ({ isInfoOpen: !state.isInfoOpen })),
  }))
);
