import { create } from 'zustand';

// Initial baseline simulation time: April 15th, 08:00 AM
const initialTime = new Date('2026-04-15T08:00:00').getTime();

const useSimulationStore = create((set, get) => ({
  isRunning: false,
  simulationTime: initialTime,
  simulationSpeed: 1, // Multiplier: 1x, 5x, 24x

  toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),

  startSimulation: () => set({ isRunning: true }),

  pauseSimulation: () => set({ isRunning: false }),

  setSpeed: (speed) => set({ simulationSpeed: speed }),

  // Advance simulation clock by milliseconds
  advanceTime: (milliseconds) => set((state) => ({
    simulationTime: state.simulationTime + milliseconds,
  })),

  // Step forward by 1 hour (3,600,000 ms)
  stepHour: (hours = 1) => set((state) => ({
    simulationTime: state.simulationTime + hours * 3600000,
  })),

  // Step forward by 1 day (86,400,000 ms)
  stepDay: (days = 1) => set((state) => ({
    simulationTime: state.simulationTime + days * 86400000,
  })),

  // Reset clock back to initial baseline
  resetTime: () => set({
    simulationTime: initialTime,
    isRunning: false,
    simulationSpeed: 1,
  }),
}));

export default useSimulationStore;
