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
    { id: 'c1', title: 'The Stranger\'s Story', description: 'Ask a stranger about their favorite childhood memory.', category: 'Connection', color: 'var(--mission-connection)' },
    { id: 'c2', title: 'Silent Shared Moment', description: 'Sit in a public park and simply observe the people around you for 10 minutes without checking your phone.', category: 'Connection', color: 'var(--mission-connection)' },
  ],
  Creativity: [
    { id: 'cr1', title: 'Found Art Sculpture', description: 'Create a small sculpture using only natural materials found within 100 feet of where you stand.', category: 'Creativity', color: 'var(--mission-creativity)' },
    { id: 'cr2', title: 'Shadow Photography', description: 'Take 5 photos of interesting shadows. Do not include the objects casting them.', category: 'Creativity', color: 'var(--mission-creativity)' },
  ],
  Adventure: [
    { id: 'a1', title: 'The Coin Flip Journey', description: 'Walk for 15 minutes. At every intersection, flip a coin: Heads = Left, Tails = Right.', category: 'Adventure', color: 'var(--mission-adventure)' },
    { id: 'a2', title: 'Urban Archeology', description: 'Find the oldest building on your block and learn one fact about its history.', category: 'Adventure', color: 'var(--mission-adventure)' },
  ],
  Learning: [
    { id: 'l1', title: 'Micro-Expertise', description: 'Spend 15 minutes learning about a specific type of cloud formation. Identify one today.', category: 'Learning', color: 'var(--mission-learning)' },
    { id: 'l2', title: 'Etymology Hunter', description: 'Pick a common word you use daily and find out its origin story.', category: 'Learning', color: 'var(--mission-learning)' },
  ],
  'Self-Discovery': [
    { id: 's1', title: 'Letter to the Future', description: 'Write a short letter to yourself 5 years from now. Hide it in a book you love.', category: 'Self-Discovery', color: 'var(--mission-self)' },
    { id: 's2', title: 'Gratitude Walk', description: 'Walk for 10 minutes and mentally list 10 things you are grateful for that you can see right now.', category: 'Self-Discovery', color: 'var(--mission-self)' },
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
