<template>
  <div class="home">
    <div class="w-10/12 m-auto">
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

      <div>function</div>

      <div>
        <div class="text-left font-bold">API key</div>
        <div>
          <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="apiKey" />
        </div>
      </div>
      <hr class="border-1 mt-2 w-full" />
      <div>
        <div>
          <div class="text-left font-bold">Message</div>
          <div>
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="message" rows="8"></textarea>
          </div>
        </div>
        {{ last_message }}
      </div>
      <div>
        <button @click="test" class="flex-grow p-2 border rounded-md mt-2 w-full bg-blue-400">Test</button>
      </div>

      <hr class="border-1 mt-2 w-full" />
      manifest<br />
      <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(manifest, null, '\t')" rows="20" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { ManifestData, ChatData } from "slashgpt";

import { call_llm } from "./llm";

export default defineComponent({
  name: "HomePage",
  components: {},
  setup() {
    const apiKey = ref(localStorage.getItem("apiKey") ?? "");

    const title = ref(localStorage.getItem("title") ?? "");
    const prompt = ref(localStorage.getItem("prompt") ?? "");

    const message = ref(localStorage.getItem("message") ?? "");
    const last_message = ref<ChatData | undefined>(undefined);

    const manifest = computed(() => {
      return {
        title: title.value,
        prompt: [prompt.value],
        about: "",
        bot: "",
        temperature: 0.7,
        actions: {},
        sample: "",
      } as ManifestData;
    });
    const test = async () => {
      console.log("TEST");
      const res = await call_llm(apiKey.value, message.value, manifest.value);
      last_message.value = res.last_message;
    };

    watch(apiKey, () => {
      localStorage.setItem("apiKey", apiKey.value);
    });
    watch(title, () => {
      localStorage.setItem("title", title.value);
    });
    watch(prompt, () => {
      localStorage.setItem("prompt", prompt.value);
    });

    watch(message, () => {
      localStorage.setItem("message", message.value);
    });

    return {
      apiKey,
      title,
      prompt,
      message,

      manifest,
      last_message,

      test,
    };
  },
});
</script>
