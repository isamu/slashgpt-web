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

          <div>function</div>
          <div>
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="functions" rows="10"></textarea>
          </div>

          <div>
            <div class="text-left font-bold">API key</div>
            <div>
              <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="apiKey" />
            </div>
          </div>

          manifest<br />
          <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(manifest, null, '\t')" rows="20" />
        </div>
      </div>
      <div class="w-1/2">
        <div class="border-2 p-2 rounded-xl border-2 m-2">
          <div>
            <div>
              <div class="text-left font-bold">Message</div>
              <div v-for="(message, k) in messages" :key="k" class="text-left">
                <div v-if="message.role === 'user'"><b>You</b>: {{ message.content }}</div>
                <div v-if="message.role === 'assistant'">
                  <b>GPT</b>:
                  {{ message.content }}
                  <pre>{{ message.function_data }}</pre>
                </div>
              </div>
              <div>
                <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="userInput" rows="5"></textarea>
              </div>
            </div>
            <input type="checkbox" v-model="save_history" />History
          </div>
          <div>
            <button @click="test" class="flex-grow p-2 border rounded-md mt-2 w-full bg-blue-400">Test</button>
          </div>
        </div>
      </div>
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

    const functions = ref(localStorage.getItem("functions") ?? "");

    const userInput = ref(localStorage.getItem("userInput") ?? "");
    const last_message = ref<ChatData | undefined>(undefined);
    const messages = ref<ChatData[]>([]);
    const save_history = ref(true);

    const function_object = computed(() => {
      try {
        return JSON.parse(functions.value);
      } catch (e) {
        return {};
      }
      // return functions.value
    });

    const manifest = computed(() => {
      return {
        title: title.value,
        prompt: [prompt.value],
        about: "",
        bot: "",
        temperature: 0.7,
        actions: {},
        functions: function_object.value,
        sample: "",
      } as ManifestData;
    });
    const test = async () => {
      console.log("TEST");
      
      const res = await call_llm(apiKey.value, userInput.value, manifest.value, save_history.value ? messages.value : []);
      messages.value = (res.messages || []).slice(1);
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
    watch(functions, () => {
      localStorage.setItem("functions", functions.value);
    });

    watch(userInput, () => {
      localStorage.setItem("userInput", userInput.value);
    });

    return {
      apiKey,
      title,
      prompt,
      userInput,
      functions,

      manifest,
      last_message,
      messages,
      save_history,

      test,
    };
  },
});
</script>
