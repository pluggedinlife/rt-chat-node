<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
  },
  isMine: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="p-2 flex" :class="isMine ? ' justify-end' : ''">
    <span
      class="dark:text-gray-800 px-2 py-1 rounded-xl max-w-full break-words"
      :class="isMine ? 'bg-blue-200' : 'bg-green-200'"
      >{{ props.message }}</span
    >
  </div>
</template>
