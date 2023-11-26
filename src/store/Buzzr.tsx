import {create} from 'zustand'

export interface Buzzrs {
    _id: string | '',
    title: string | '',
    maxQuestions: number | 0,
    questions: object[] | [],
}

interface BuzzrState {
    buzzrs : Buzzrs[],
    addBuzzr: (buzzr: Buzzrs) => void
}

export const useBuzzrStore = create<BuzzrState>((set) => ({
    buzzrs: [],
    addBuzzr: (buzzr) => {
        return set((state) => ({buzzrs: [ buzzr,...state.buzzrs]}))
    },
}))