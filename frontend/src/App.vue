<script setup lang="ts">
import VChatView from './views/VChatView.vue';
import { postStore } from './store/post.store';
import { ref } from 'vue';

const store = postStore();

let username = ref<string>('');

async function handleSubmit() {
  if (username.value.trim()) {
    store.setCurrentUser(username.value);
    username.value = '';
  }
}
</script>

<template>
  <div
    class="dark:bg-gray-700 h-screen dark:text-gray-50 font-extralight text-gray-800 bg-white"
  >
    <div
      v-if="store.getCurrentUser == ''"
      class="flex items-center justify-center h-full"
    >
      <div class="flex flex-col text-sm">
        <label for="username">Insert your username</label>
        <div
          class="bg-blue-200 dark:text-black p-2 border border-gray-600 rounded-lg"
        >
          <input
            v-model="username"
            @keyup.enter="handleSubmit"
            class="bg-transparent focus:outline-none"
            id="username"
            type="text"
          />
        </div>
      </div>
    </div>

    <VChatView v-else />
  </div>
</template>
