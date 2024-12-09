import { defineStore } from 'pinia';
import axios from 'axios';

interface Post {
  id: number | null;
  value: string;
  nick: string;
}

export const postStore = defineStore('post-store', {
  state: () => ({
    currentUser: '' as string,
    postList: [] as Post[],
    loading: false,
  }),
  actions: {
    setCurrentUser(item: string) {
      this.currentUser = item;
    },

    async fetchPosts(): Promise<void> {
      try {
        let result = await axios.get('http://localhost:3000/post');
        if (result != undefined) {
          this.postList = result.data.map((item: any) => ({
            id: item.id,
            value: item.value,
            nick: item.nick,
          }));
        }
      } catch (e) {
        console.log(`Something wrong went in fetchPosts: `, e);
      }
    },

    async sendPost(value: string, nick: string): Promise<void> {
      try {
        await axios.post('http://localhost:3000/post', {
          value,
          nick,
        });
      } catch (e) {
        console.log(`Something wrong went in sendPost: `, e);
      }
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },

    getPostList: (state) => {
      return state.postList;
    },
  },
});
