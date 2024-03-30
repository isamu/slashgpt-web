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

          <div class="flex">
            <div class="inline-flex items-center justify-center">
              Function<span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="openFunctionCreate">add_circle </span>
            </div>
          </div>

          <div v-for="(func, k) in functions" class="text-left border rounded-md p-2" :key="k">
            <div><span class="font-bold">Name</span>: <input v-model="func.name" class="flex-grow p-2 border rounded-md mt-2" /></div>
            <div><span class="font-bold">Description</span>: <input v-model="func.description" class="flex-grow p-2 border rounded-md mt-2" /></div>
            <div>
              <span class="font-bold">Parameters</span>:
              <div v-for="(prop, j) in Object.keys(func.parameters.properties)" :key="j" class="flex-grow p-2 border rounded-md mt-2">
                <div>Name: {{ prop }}</div>
                <div>Type: {{ func.parameters.properties[prop].type }}</div>
                <div>Description: <input v-model="func.parameters.properties[prop].description" class="flex-grow p-2 border rounded-md mt-2" /></div>
              </div>
            </div>
          </div>
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
      </div>
    </div>
    <Modal v-if="toggleCreateFunction" @closeModal="openFunctionCreate"> name: type: </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { ManifestData, ChatData } from "slashgpt";

import { call_llm } from "./llm";

import Modal from "@/components/Modal.vue";

const functionParametersTypes = ["number", "string"];

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const apiKey = ref(localStorage.getItem("apiKey") ?? "");

    const title = ref(localStorage.getItem("title") ?? "");
    const prompt = ref(localStorage.getItem("prompt") ?? "");

    const functions = ref(JSON.parse(localStorage.getItem("functions") ?? "{}"));
    const actions = ref(localStorage.getItem("actions") ?? "");

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
        functions: functions.value,
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
      localStorage.setItem("functions", JSON.stringify(functions.value));
    });
    watch(actions, () => {
      localStorage.setItem("actions", actions.value);
    });

    watch(userInput, () => {
      localStorage.setItem("userInput", userInput.value);
    });

    const toggleCreateFunction = ref(false);
    const openFunctionCreate = () => {
      console.log("AAA");
      toggleCreateFunction.value = !toggleCreateFunction.value;
    };

    return {
      apiKey,
      title,
      prompt,
      userInput,
      functions,
      actions,

      manifest,
      last_message,
      messages,
      save_history,

      test,

      openFunctionCreate,
      toggleCreateFunction,
    };
  },
});
</script>
