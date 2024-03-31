<template>
  <div class="fixed w-full h-full top-0 left-0 flex flex items-center justify-center bg-gray-700 bg-opacity-50" @click="closeModal">
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl" @click.stop>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  emits: ["closeModal"],
  setup(_, { emit }) {
    return {
      closeModal: () => {
        emit("closeModal");
      },
    };
  },
});
</script>
