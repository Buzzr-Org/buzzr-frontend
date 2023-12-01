import {create} from 'zustand'

export interface Question {
    _id: string,
    text: string,
    options: Array<{
        option: string,
        isRight: boolean
    }>
    media: {
        link: string | null,
        type: string
    }
}

interface QuestionState {
    questions : Array<Question>,
    setQuestions: (questions: Array<Question>) => void,
    removeAllQuestions: () => void,
    addQuestion: (question: Question) => void,
    deleteQuestion: (id: string) => void
}

export const useQuestionStore = create<QuestionState>((set) => ({
    questions: [],
    setQuestions: (ques) => {
        return set((state) => ({questions: [...ques]}))
    },
    removeAllQuestions: () => {
        return set((state) => ({questions: []}))
    },
    addQuestion: (question:Question) => set((state) => (
        {questions: [question,...state.questions]}
    )),
    deleteQuestion: (id:string) => set((state) => (
       {questions: state.questions.filter((question) => question._id !== id)}
    )),
}))