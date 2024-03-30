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
          <chat-message :apiKey="apiKey" :manifest="manifest" />
        </div>
      </div>
    </div>
    <Modal v-if="toggleCreateFunction" @closeModal="openFunctionCreate"> name: type: </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { ManifestData, ChatData } from "slashgpt";

import Modal from "@/components/Modal.vue";
import ChatMessage from "@/views/ChatMessage.vue";

const functionParametersTypes = ["number", "string"];

export default defineComponent({
  components: {
    Modal,
    ChatMessage,
  },
  setup() {
    const apiKey = ref(localStorage.getItem("apiKey") ?? "");

    const title = ref(localStorage.getItem("title") ?? "");
    const prompt = ref(localStorage.getItem("prompt") ?? "");

    const functions = ref(JSON.parse(localStorage.getItem("functions") ?? "{}"));
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
        functions: functions.value,
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
      localStorage.setItem("functions", JSON.stringify(functions.value));
    });
    watch(actions, () => {
      localStorage.setItem("actions", actions.value);
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
      functions,
      actions,

      manifest,

      openFunctionCreate,
      toggleCreateFunction,
    };
  },
});
</script>
