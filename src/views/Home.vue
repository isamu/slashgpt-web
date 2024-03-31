<template>
  <div class="home">
    <div class="w-10/12 m-auto flex">
      <div class="w-1/2">
        <div class="border-2 p-2 m-2 rounded-xl border-2">
          Manifest
          <div>
            <div class="text-left font-bold">Title</div>
            <div>
              <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="title" />
            </div>
          </div>
          <div>
            <div class="text-left font-bold">Description</div>
            <div>
              <textarea class="flex-grow p-2 border rounded-md mt-2 w-full"></textarea>
            </div>
          </div>
          <div>
            <div class="text-left font-bold">Prompt</div>
            <div>
              <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="prompt" rows="10"></textarea>
            </div>
          </div>
          <div>
            <div class="text-left font-bold">Temperature</div>
            <div>
              <input class="flex-grow p-2 border rounded-md mt-2 w-full" />
            </div>
          </div>

          <FunctionEditor v-model="functions" />
          <div>actions</div>
          <div>
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="actions" rows="10"></textarea>
          </div>

          <div>
            <div class="text-left font-bold">API key</div>
            <div>
              <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="apiKey" />
            </div>
          </div>

          manifest<br />
          <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(manifest, null, '\t')" rows="20" />
          Function:
          <div class="flex-grow p-2 border rounded-md mt-2 w-full text-left">
            {{ functions }}
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="border-2 p-2 rounded-xl border-2 m-2">
          <chat-message :apiKey="apiKey" :manifest="manifest" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { ManifestData } from "slashgpt";

import ChatMessage from "@/views/ChatMessage.vue";
import FunctionEditor from "@/views/FunctionEditor.vue";

export default defineComponent({
  components: {
    ChatMessage,
    FunctionEditor,
  },
  setup() {
    const apiKey = ref(localStorage.getItem("apiKey") ?? "");

    const title = ref(localStorage.getItem("title") ?? "");
    const prompt = ref(localStorage.getItem("prompt") ?? "");

    const functions = ref(localStorage.getItem("functions") ?? "{}");
    const actions = ref(localStorage.getItem("actions") ?? "");

    const function_object = computed(() => {
      try {
        return JSON.parse(functions.value);
      } catch (e) {
        return {};
      }
    });
    const actions_object = computed(() => {
      try {
        return JSON.parse(actions.value);
      } catch (e) {
        return {};
      }
    });

    const manifest = computed(() => {
      return {
        title: title.value,
        prompt: [prompt.value],
        about: "",
        bot: "",
        temperature: 0.7,
        actions: actions_object.value,
        functions: function_object.value,
        sample: "",
      } as ManifestData;
    });

    watch(apiKey, () => {
      localStorage.setItem("apiKey", apiKey.value);
    });
    watch(title, () => {
      localStorage.setItem("title", title.value);
    });
    watch(prompt, () => {
      localStorage.setItem("prompt", prompt.value);
    });
    watch(functions, () => {
      localStorage.setItem("functions", functions.value);
    });
    watch(actions, () => {
      localStorage.setItem("actions", actions.value);
    });

    return {
      apiKey,
      title,
      prompt,
      functions,
      actions,

      manifest,
    };
  },
});
</script>
