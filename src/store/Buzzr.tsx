import {create} from 'zustand'

export interface Buzzr {
    _id: string | '',
    title: string | '',
    maxQuestions: number | 0,
    questions: object[] | [],
}

interface BuzzrState {
    buzzrs : Buzzr[],
    addBuzzr: (buzzr: Buzzr) => void,
    deleteBuzzr: (id: string) => void,
    setBuzzrs: (buzzr: Buzzr[]) => void,
    removeAllBuzzrs: () => void,
}

export const useBuzzrStore = create<BuzzrState>((set) => ({
    buzzrs: [],
    setBuzzrs: (buzz) => {
        return set((state) => ({buzzrs: [...buzz]}))
    },
    removeAllBuzzrs: () => {
        return set((state) => ({buzzrs: []}))
    },
    addBuzzr: (buzzr:Buzzr) => set((state) => (
        {buzzrs: [buzzr,...state.buzzrs]}
    )),
    deleteBuzzr: (id:string) => set((state) => (
       {buzzrs: state.buzzrs.filter((buzzr) => buzzr._id !== id)}
    )),
}))