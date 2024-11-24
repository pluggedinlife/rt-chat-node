<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
  },
});
</script>

<template>
  <div class="p-2 flex justify-end">
    <span
      class="bg-blue-200 dark:text-gray-800 px-2 py-1 rounded-xl max-w-full break-words"
      >{{ props.message }}</span
    >
  </div>
</template>
