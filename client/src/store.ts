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

const ORACLE_RESPONSES = [
  "Why do you seek what you seek?",
  "The mirror reveals only what you bring to it. Look closer.",
  "Is your journey truly your own, or are you following the dust of others?",
  "What would you do if no one was watching?",
  "Silence is also an answer. Listen to it.",
  "You are the art you have been looking for."
];

const TRANSMUTATION_DB = [
    {
        keywords: ['fear', 'afraid', 'scared', 'anxiety'],
        insight: "Fear is merely the border of your known reality.",
        wisdom: "Let this fear become Curiosity. Explore the unknown without the tether of expectation."
    },
    {
        keywords: ['regret', 'mistake', 'past', 'sorry'],
        insight: "The past is a lesson, not a life sentence.",
        wisdom: "Let this regret become Experience. You have already paid the price; now keep the lesson."
    },
    {
        keywords: ['anger', 'mad', 'hate', 'furious'],
        insight: "Your fire can destroy, or it can forge.",
        wisdom: "Let this anger become Passion. Direct this heat towards creating something beautiful."
    },
    {
        keywords: ['sad', 'grief', 'loss', 'cry'],
        insight: "Sorrow carves the space where joy will one day reside.",
        wisdom: "Let this sadness become Depth. Your capacity to feel is your greatest strength."
    },
    {
        keywords: ['tired', 'exhausted', 'burnout', 'drained'],
        insight: "Even the sun must set to rise again.",
        wisdom: "Let this exhaustion become Rest. Surrender to the pause, for it is part of the music."
    }
];

const DEFAULT_TRANSMUTATION = {
    insight: "To release is to make space for the new.",
    wisdom: "Let this burden become Ash, fertilizing the soil for your next bloom."
};

const MOCK_MISSIONS: Record<MissionCategory, Mission[]> = {
  Connection: [
    { id: 'c1', title: 'Compliment the Shoes', description: 'Find the next person you see with dusty boots and give them a sincere compliment about their footwear specifically.', category: 'Connection', color: 'var(--mission-connection)' },
    { id: 'c2', title: 'Water Fairy', description: 'Offer a drink of water (or electrolytes) to a stranger who looks like they need it. Ask for consent first, always.', category: 'Connection', color: 'var(--mission-connection)' },
    { id: 'c3', title: 'The Question', description: 'Ask a stranger: "What is the weirdest gift you have received on the Playa so far?"', category: 'Connection', color: 'var(--mission-connection)' },
    { id: 'c4', title: 'High Five Line', description: 'Start a high-five line with at least 3 strangers.', category: 'Connection', color: 'var(--mission-connection)' },
  ],
  Creativity: [
    { id: 'cr1', title: 'Dust Masterpiece', description: 'Draw a temporary masterpiece in the dust near your feet. Give it a title and walk away.', category: 'Creativity', color: 'var(--mission-creativity)' },
    { id: 'cr2', title: 'Interpretive Dance', description: 'Dance like a robot at the nearest sound camp or art car for exactly 2 minutes.', category: 'Creativity', color: 'var(--mission-creativity)' },
    { id: 'cr3', title: 'Hat Swap', description: 'Ask a friend to swap hats with you for the next hour. If solo, wear your hat backwards.', category: 'Creativity', color: 'var(--mission-creativity)' },
    { id: 'cr4', title: 'Shadow Puppets', description: 'Find a light source and make shadow puppets for an imaginary audience.', category: 'Creativity', color: 'var(--mission-creativity)' },
  ],
  Adventure: [
    { id: 'a1', title: 'Art Car Hitchhiker', description: 'Find the nearest art car. Ask the driver where they are headed and if you can hop on (if safe/allowed).', category: 'Adventure', color: 'var(--mission-adventure)' },
    { id: 'a2', title: 'Trash Fence Trek', description: 'Walk towards the trash fence until you find something interesting. Do not touch the fence.', category: 'Adventure', color: 'var(--mission-adventure)' },
    { id: 'a3', title: 'Sunrise Scout', description: 'Find a spot with a perfect view of the horizon. Tell someone "This is the spot" and walk away.', category: 'Adventure', color: 'var(--mission-adventure)' },
    { id: 'a4', title: 'Follow the Music', description: 'Close your eyes, spin around, and walk towards the first music you hear.', category: 'Adventure', color: 'var(--mission-adventure)' },
  ],
  Learning: [
    { id: 'l1', title: 'Camp Name Story', description: 'Stop at a theme camp you do not know. Ask a camper to tell you the wildly exaggerated story of their camp\'s name.', category: 'Learning', color: 'var(--mission-learning)' },
    { id: 'l2', title: 'Skill Swap', description: 'Find someone doing something cool. Ask them to teach you one basic move or concept in under 5 minutes.', category: 'Learning', color: 'var(--mission-learning)' },
    { id: 'l3', title: 'The Man Perspective', description: 'Observe the Man from a lying down position. Note how the perspective changes the feeling of the structure.', category: 'Learning', color: 'var(--mission-learning)' },
    { id: 'l4', title: 'Dust Analysis', description: 'Pick up a handful of dust. Describe its texture to the nearest inanimate object.', category: 'Learning', color: 'var(--mission-learning)' },
  ],
  'Self-Discovery': [
    { id: 's1', title: 'MOOP Story', description: 'Find a piece of Matter Out Of Place (MOOP). Pick it up and invent a dramatic backstory for how it got there before throwing it away.', category: 'Self-Discovery', color: 'var(--mission-self)' },
    { id: 's2', title: 'Silence Check', description: 'Stop exactly where you are. Listen to the sounds of the Playa for 60 seconds. Count how many distinct sounds you hear.', category: 'Self-Discovery', color: 'var(--mission-self)' },
    { id: 's3', title: 'Mental Thank You', description: 'Think of the person who helped you get here. Send them a mental high-five right now.', category: 'Self-Discovery', color: 'var(--mission-self)' },
    { id: 's4', title: 'Dust Angel', description: 'Lie down in the dust and make a dust angel. Embrace the dusty coating.', category: 'Self-Discovery', color: 'var(--mission-self)' },
  ]
};

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
      for (let i = 1; i < DISPENSER_STEPS.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
        set({ processingStep: DISPENSER_STEPS[i] });
      }
      const categories = Object.keys(MOCK_MISSIONS) as MissionCategory[];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const missions = MOCK_MISSIONS[randomCat];
      const randomMission = missions[Math.floor(Math.random() * missions.length)];
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ processingStep: null, mission: randomMission });
    },

    reset: () => set({ mission: null, activeMachine: null, processingStep: null }),

    sendOracleMessage: async (message) => {
        set((state) => ({ 
            oracleChat: [...state.oracleChat, { role: 'user', content: message }],
            isOracleProcessing: true 
        }));

        await new Promise(resolve => setTimeout(resolve, 1500));

        const randomResponse = ORACLE_RESPONSES[Math.floor(Math.random() * ORACLE_RESPONSES.length)];
        
        set((state) => ({
            oracleChat: [...state.oracleChat, { role: 'oracle', content: randomResponse }],
            isOracleProcessing: false
        }));
    },

    resetOracle: () => set({ 
        oracleChat: [{ role: 'oracle', content: "I am the Reflective Oracle. I see what you hide. Speak." }],
        activeMachine: null
    }),

    transmuteBurden: async (burden) => {
      set({ isTransmuting: true });
      
      // Analyze burden (basic keyword matching for mockup)
      const lowerBurden = burden.toLowerCase();
      const match = TRANSMUTATION_DB.find(t => t.keywords.some(k => lowerBurden.includes(k)));
      const result = match || DEFAULT_TRANSMUTATION;

      // Simulate alchemy time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      set({ 
        isTransmuting: false, 
        transmutation: {
            original: burden,
            insight: result.insight,
            wisdom: result.wisdom
        }
      });
    },

    resetTemple: () => set({ transmutation: null, activeMachine: null }),

    toggleAdvancedMode: () => set((state) => ({ isAdvancedMode: !state.isAdvancedMode })),
    updateAdvancedSettings: (settings) => set((state) => ({ 
      advancedSettings: { ...state.advancedSettings, ...settings } 
    })),

    toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
    toggleInfo: () => set((state) => ({ isInfoOpen: !state.isInfoOpen })),
  }))
);
