<template>
  <div class="home">
    <div class="w-10/12 m-auto flex">
      <div class="w-2/12">
        <div class="border-2 p-2 m-2 rounded-xl border-2">
          <div v-for="(key, k) in Object.keys(dataSet)" :key="k">
            <button class="border-2 my-2 py-2 rounded-xl border-2 w-full" @click="updateData(key)">
              {{ dataSet[key].manifest.title }}
            </button>
          </div>
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

import Editor from "@/components/editor/Editor.vue";
import { dataSet } from "@/utils/data";

export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    const editorRef = ref();

    const updateData = (key: string) => {
      editorRef.value.updateData(dataSet[key]);
    };

    return {
      updateData,

      editorRef,
      dataSet,
    };
  },
});
</script>
