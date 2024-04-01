<template>
  <div>
    <div>
      <div>
        <div class="text-left font-bold">Message</div>
        <div v-for="(message, k) in messages" :key="k" class="text-left">
          <div v-if="message.role === 'user'"><b>You</b>: {{ message.content }}</div>
          <div v-if="message.role === 'assistant'">
            <b>GPT</b>:
            <div v-for="(line, j) in message.content.split('\n')" :key="j">
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
      <button @click="send" class="flex-grow p-2 border rounded-md mt-2 w-full bg-blue-400" :disabled="isLoading">
        {{ isLoading ? "Loading..." : "Send" }}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { call_llm } from "@/utils/llm";

export default defineComponent({
  props: {
    apiKey: {
      type: String,
      default: "",
    },
    manifest: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const userInput = ref(localStorage.getItem("userInput") ?? "");
    const messages = ref<ChatData[]>([]);
    const save_history = ref(true);

    const isLoading = ref(false);
    
    const send = async () => {
      isLoading.value = true;
      const res = await call_llm(props.apiKey, userInput.value, props.manifest, save_history.value ? messages.value : []);
      messages.value = (res.messages || []).slice(1);
      isLoading.value = false;
    };
    watch(userInput, () => {
      localStorage.setItem("userInput", userInput.value);
    });

    return {
      userInput,
      send,

      save_history,
      messages,

      isLoading,
    };
  },
});
</script>
