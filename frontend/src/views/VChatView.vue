<template>
  <div class="flex flex-col">
    <div class="h-screen relative overflow-auto pb-10 flex flex-col">
      <VMessage
        v-for="(item, index) in messageList"
        :key="index"
        :message="item"
      />
    </div>

    <div
      class="absolute bottom-0 w-full flex flex-col px-2 pb-1 border-t border-t-gray-700 dark:border-t-gray-500"
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

let message = ref<string>('');
let messageList = ref<string[]>([]);

onMounted(() => {
  socket.connect();
  socket.on('message', handleMessage);
});

onBeforeMount(() => {
  socket.disconnect();
});

function handleMessage(data: string, id: string) {
  if (id !== socket.id) {
    messageList.value.push(data);
  }
}

function handleSubmit() {
  if (message.value.trim()) {
    messageList.value.push(message.value);
    socket.emit('message', message.value, socket.id as string);
    message.value = '';
  }
}
</script>
