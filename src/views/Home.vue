<template>
  <div class="home">
    <div class="">
      <div>
        title: <input class="flex-grow p-2 border rounded-md mt-2" v-model="title" />
      </div>
      <div>
        description
        <textarea class="flex-grow p-2 border rounded-md mt-2"></textarea>
      </div>
      <div>
        prompt
        <textarea class="flex-grow p-2 border rounded-md mt-2" v-model="prompt"></textarea>
      </div>
      <div>
        temperature: <input class="flex-grow p-2 border rounded-md mt-2" />
      </div>
      <div>
        function
        
      </div>
      
    </div>
    
    <div>
      api key: <input class="flex-grow p-2 border rounded-md mt-2" v-model="apiKey" />
    </div>
    <hr class="border-1 mt-2" />
    <div>
      <div>
        message
        <textarea class="flex-grow p-2 border rounded-md mt-2" v-model="message"></textarea>
      </div>
      {{ last_message }}
    </div>
    <div>
      <button @click="test" class="flex-grow p-2 border rounded-md mt-2">test</button>
    </div>

    <hr class="border-1 mt-2" />
    manifest<br/>
    <textarea class="flex-grow p-2 border rounded-md mt-2" :value="JSON.stringify(manifest)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { ManifestData, ChatData } from "slashgpt";

import { call_llm } from "./llm";

export default defineComponent({
  name: "HomePage",
  components: {
  },
  setup(){
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
      localStorage.setItem("apiKey", apiKey.value)
    });
    watch(title, () => {
      localStorage.setItem("title", title.value)
    });
    watch(prompt, () => {
      localStorage.setItem("prompt", prompt.value)
    });

    watch(message, () => {
      localStorage.setItem("message", message.value)
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
