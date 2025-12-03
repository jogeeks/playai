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
  intensity: number; // 0 (Mild) to 100 (Wild)
  social: number;    // 0 (Solo) to 100 (Group)
  weirdness: number; // 0 (Grounded) to 100 (Absurd)
}

interface State {
  isNearMachine: boolean;
  isInputOpen: boolean;
  processingStep: string | null; // null if not processing
  mission: Mission | null;
  audioEnabled: boolean;
  isInfoOpen: boolean;
  
  // Advanced Mode
  isAdvancedMode: boolean;
  advancedSettings: AdvancedSettings;

  // Actions
  setNearMachine: (near: boolean) => void;
  setInputOpen: (open: boolean) => void;
  startProcessing: (aspiration: string) => Promise<void>;
  reset: () => void;
  toggleAudio: () => void;
  toggleInfo: () => void;
  toggleAdvancedMode: () => void;
  updateAdvancedSettings: (settings: Partial<AdvancedSettings>) => void;
}

const PROCESSING_STEPS = [
  "Calibrating serendipity sensors...",
  "Scanning Playa vibes...",
  "Injecting controlled chaos...",
  "Aligning with the dust...",
  "Manifesting opportunity...",
  "Dispensing serendipity!"
];

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
    isNearMachine: false,
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

    setNearMachine: (near) => set({ isNearMachine: near, isInputOpen: near }),
    
    setInputOpen: (open) => set({ isInputOpen: open }),

    startProcessing: async (aspiration) => {
      set({ isInputOpen: false, processingStep: PROCESSING_STEPS[0] });

      // Simulate processing steps
      for (let i = 1; i < PROCESSING_STEPS.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
        set({ processingStep: PROCESSING_STEPS[i] });
      }

      // Generate random mission based on "aspiration" (random for now)
      const categories = Object.keys(MOCK_MISSIONS) as MissionCategory[];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const missions = MOCK_MISSIONS[randomCat];
      const randomMission = missions[Math.floor(Math.random() * missions.length)];

      await new Promise(resolve => setTimeout(resolve, 500));
      set({ processingStep: null, mission: randomMission });
    },

    reset: () => set({ mission: null, isNearMachine: false, processingStep: null }),

    toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
    toggleInfo: () => set((state) => ({ isInfoOpen: !state.isInfoOpen })),
    
    toggleAdvancedMode: () => set((state) => ({ isAdvancedMode: !state.isAdvancedMode })),
    updateAdvancedSettings: (settings) => set((state) => ({ 
      advancedSettings: { ...state.advancedSettings, ...settings } 
    })),
  }))
);
