<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col-reverse flex-1">Chat Area</div>
    <div class="flex border-t">Message:</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import socket from '../../socket';

interface Message {
  id: number;
  text: string;
}

export default defineComponent({
  setup() {
    const message = ref<string>('');
    const messages = ref<Message[]>([]);

    const sendMessage = () => {
      if (message.value) {
        socket.emit('message', message.value);
        message.value = '';
      }
    };

    onMounted(() => {
      socket.on('message', (msg: string) => {
        messages.value.push({ id: Date.now(), text: msg });
      });
    });

    onBeforeUnmount(() => {
      socket.off('message');
    });

    return {
      message,
      messages,
      sendMessage,
    };
  },
});
</script>
