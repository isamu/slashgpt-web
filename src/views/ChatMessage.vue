<template>
  <div>
    <div>
      <div>
        <div class="text-left font-bold">Message</div>
        <div v-for="(message, k) in messages" :key="k" class="text-left">
          <div v-if="message.role === 'user'"><b>You</b>: {{ message.content }}</div>
          <div v-if="message.role === 'assistant'">
            <b>GPT</b>:
            <div v-for="(line, k) in message.content.split('\n')" :key="k">
              {{ line }}
            </div>
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
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { call_llm } from "./llm";

export default defineComponent({
  props: {
    apiKey: String,
    manifest: Object,
  },
  setup(props) {
    const userInput = ref(localStorage.getItem("userInput") ?? "");
    const messages = ref<ChatData[]>([]);
    const save_history = ref(true);

    const test = async () => {
      console.log("TEST");

      const res = await call_llm(props.apiKey, userInput.value, props.manifest, save_history.value ? messages.value : []);
      messages.value = (res.messages || []).slice(1);
    };
    watch(userInput, () => {
      localStorage.setItem("userInput", userInput.value);
    });

    return {
      userInput,
      test,

      save_history,
      messages,
    };
  },
});
</script>
