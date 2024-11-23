<template>
  <div class="bg-blue-200 flex flex-col">
    <div class="h-screen relative overflow-auto pb-10">
      <ul>
        <li v-for="(item, index) in messageList" :key="index">{{ item }}</li>
      </ul>
    </div>

    <div class="bg-red-200 absolute bottom-0 w-full flex flex-col">
      <label for="messageInput"> put the message in</label>
      <input
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
import { ref } from 'vue';

let message = ref('');
let messageList = ref(['']);

function handleSubmit() {
  messageList.value.push(message.value);
  message.value = '';
}
</script>
