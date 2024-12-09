<template>
  <div class="flex flex-col">
    <div
      class="h-screen relative overflow-auto py-10 flex flex-col scroll-smooth"
    >
      <VMessage
        v-for="(item, index) in messageList"
        :key="index"
        :message="item.value"
        :isMine="item.isMine"
      />
    </div>

    <div
      class="absolute bottom-0 w-full max-h-44 flex flex-col px-2 pb-1 border-t border-t-gray-700 dark:border-t-gray-500 dark:bg-gray-700 bg-white"
    >
      <input
        placeholder="Message"
        class="dark:bg-gray-700 focus:outline-none p-1"
        type="text"
        id="messageInput"
        v-model="message"
        @input="(event:any)=>message=event.target.value"
        @keyup.enter="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import VMessage from '../components/VMessage.vue';
import socket from '../../socket';
import { postStore } from '../store/post.store';

const store = postStore();

interface messageItem {
  value: string;
  isMine: boolean;
}

let message = ref<string>('');
let messageList = ref<messageItem[]>([]);

onMounted(async () => {
  socket.connect();
  socket.on('message', handleMessage);
  await store.fetchPosts();

  if (store.getPostList.length > 0) {
    messageList.value = store.getPostList.map((item: any) => ({
      value: item.value,
      isMine: item.nick == store.currentUser,
    }));
  }
});

onBeforeMount(() => {
  socket.disconnect();
});

function handleMessage(data: string, id: string) {
  if (id !== socket.id) {
    messageList.value.push({ value: data, isMine: id == socket.id });
  }
}

function computedCurrentUser() {
  return store.getCurrentUser;
}

async function handleSubmit() {
  if (message.value.trim()) {
    await store.sendPost(message.value, computedCurrentUser());
    messageList.value.push({
      value: message.value,
      isMine: true,
    });
    socket.emit('message', message.value, socket.id as string);
    message.value = '';
  }
}
</script>
