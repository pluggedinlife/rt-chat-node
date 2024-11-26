<template>
  <div class="flex flex-col">
    <div class="h-screen relative overflow-auto pb-10 flex flex-col">
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

interface messageItem {
  value: string;
  isMine: boolean;
}

let message = ref<string>('');
let messageList = ref<messageItem[]>([]);

onMounted(() => {
  socket.connect();
  socket.on('message', handleMessage);
});

onBeforeMount(() => {
  socket.disconnect();
});

function handleMessage(data: string, id: string) {
  if (id !== socket.id) {
    messageList.value.push({ value: data, isMine: id == socket.id });
  }
}

function handleSubmit() {
  if (message.value.trim()) {
    messageList.value.push({
      value: message.value,
      isMine: true,
    });
    socket.emit('message', message.value, socket.id as string);
    message.value = '';
  }
}
</script>
