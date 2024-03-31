<template>
  <div class="home">
    <div class="w-10/12 m-auto flex">
      <div class="w-2/12">
        <div class="border-2 p-2 m-2 rounded-xl border-2">
          <button class="border-2 my-2 py-2 rounded-xl border-2 w-full" @click="updateData('game')">戦国武将</button>
        </div>
      </div>
      <div class="w-10/12">
        <Editor ref="editorRef" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Editor from "@/views/Editor.vue";
import { data } from "./data";

export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    const editorRef = ref();

    const updateData = (key: string) => {
      editorRef.value.updateData(data[key]);
    };

    return {
      updateData,

      editorRef,
    };
  },
});
</script>
