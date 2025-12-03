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

interface State {
  isNearMachine: boolean;
  isInputOpen: boolean;
  processingStep: string | null; // null if not processing
  mission: Mission | null;
  audioEnabled: boolean;
  isHelpOpen: boolean;

  // Actions
  setNearMachine: (near: boolean) => void;
  setInputOpen: (open: boolean) => void;
  startProcessing: (aspiration: string) => Promise<void>;
  reset: () => void;
  toggleAudio: () => void;
  toggleHelp: () => void;
}

const PROCESSING_STEPS = [
  "Analyzing input...",
  "Extracting keywords...",
  "Consulting wisdom database...",
  "Weaving possibilities...",
  "Calibrating serendipity...",
  "Mission generated!"
];

const MOCK_MISSIONS: Record<MissionCategory, Mission[]> = {
  Connection: [
    { id: 'c1', title: 'Radical Compliment', description: 'Find the next person you see with dusty goggles and give them a sincere compliment about their vibe.', category: 'Connection', color: 'var(--mission-connection)' },
    { id: 'c2', title: 'Gift of Water', description: 'Offer a drink of water (or electrolytes) to a stranger who looks parched. Ensure you have consent first.', category: 'Connection', color: 'var(--mission-connection)' },
    { id: 'c3', title: 'Ask the Question', description: 'Ask a stranger: "What is the best gift you have received on the Playa so far?"', category: 'Connection', color: 'var(--mission-connection)' },
  ],
  Creativity: [
    { id: 'cr1', title: 'Dust Art', description: 'Draw a temporary masterpiece in the dust near your feet. Let the wind take it when you are done.', category: 'Creativity', color: 'var(--mission-creativity)' },
    { id: 'cr2', title: 'Interpretive Dance', description: 'Dance like no one is watching at the nearest sound camp or art car for at least 5 minutes.', category: 'Creativity', color: 'var(--mission-creativity)' },
    { id: 'cr3', title: 'Costume Remix', description: 'Swap one accessory with a friend or willing stranger for the next hour.', category: 'Creativity', color: 'var(--mission-creativity)' },
  ],
  Adventure: [
    { id: 'a1', title: 'Art Car Safari', description: 'Find the nearest art car. Ask the driver where they are headed and if you can hop on (if safe/allowed).', category: 'Adventure', color: 'var(--mission-adventure)' },
    { id: 'a2', title: 'Deep Playa Trek', description: 'Walk towards the trash fence until you find an art installation with no one else around it.', category: 'Adventure', color: 'var(--mission-adventure)' },
    { id: 'a3', title: 'Sunrise/Sunset Scout', description: 'Find a spot with a perfect view of the horizon. Commit to watching the next sunrise or sunset there.', category: 'Adventure', color: 'var(--mission-adventure)' },
  ],
  Learning: [
    { id: 'l1', title: 'Camp History', description: 'Stop at a theme camp you do not know. Ask a camper to tell you the story of their camp\'s name.', category: 'Learning', color: 'var(--mission-learning)' },
    { id: 'l2', title: 'Skill Swap', description: 'Find someone doing something cool (spinning fire, juggling, building). Ask them to teach you one basic move or concept.', category: 'Learning', color: 'var(--mission-learning)' },
    { id: 'l3', title: 'The Man Watch', description: 'Observe the Man from 3 different angles. Note how the perspective changes the feeling of the structure.', category: 'Learning', color: 'var(--mission-learning)' },
  ],
  'Self-Discovery': [
    { id: 's1', title: 'MOOP Sweep', description: 'Pick up 5 pieces of Matter Out Of Place (MOOP) within 10 feet of where you stand. Leave no trace.', category: 'Self-Discovery', color: 'var(--mission-self)' },
    { id: 's2', title: 'Immediacy Pause', description: 'Stop exactly where you are. Close your eyes. Listen to the sounds of the Playa for 60 seconds.', category: 'Self-Discovery', color: 'var(--mission-self)' },
    { id: 's3', title: 'Radical Gratitude', description: 'Think of the person who helped you get here (physically or emotionally). Send them a mental thank you right now.', category: 'Self-Discovery', color: 'var(--mission-self)' },
  ]
};

export const useStore = create(
  subscribeWithSelector<State>((set, get) => ({
    isNearMachine: false,
    isInputOpen: false,
    processingStep: null,
    mission: null,
    audioEnabled: true,
    isHelpOpen: false,

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
    toggleHelp: () => set((state) => ({ isHelpOpen: !state.isHelpOpen })),
  }))
);
