import {create} from 'zustand'

export interface Post {
  id: number
  body: string
}

interface PostsState {
  posts: Post[]
  addPost: (post: Post) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [{
    id: 1,
    body: 'This is my post 1',
  }],
  addPost: (post) => set((state) => ({posts: [...state.posts, post]})),
}))