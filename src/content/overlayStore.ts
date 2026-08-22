import { create } from 'zustand'
interface OverlayState { activeId: string | null; open: (id: string) => void; close: () => void }
export const useOverlayStore = create<OverlayState>((set) => ({
  activeId: null,
  open: (id) => set({ activeId: id }),
  close: () => set({ activeId: null }),
}))
