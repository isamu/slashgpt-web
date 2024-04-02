<template>
  <div class="m-auto flex">
    <div class="w-8/12">
      <div class="border-2 p-2 m-2 rounded-xl border-2">
        <h2 class="font-bold text-xl">Manifest</h2>
        <div>
          <div class="text-left font-bold">Title</div>
          <div>
            <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="title" />
          </div>
        </div>
        <div>
          <div class="text-left font-bold">Description</div>
          <div>
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="description"></textarea>
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
            <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="temperature" />
          </div>
        </div>

        <FunctionEditor v-model="functions" @addActionsElement="addActionsElement" @removeActionsElement="removeActionsElement" />
        <div class="text-left font-bold mt-2">Actions</div>
        <div>
          <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="actions" rows="10"></textarea>
        </div>
      </div>
      <div class="m-2">
        <button @click="download" class="flex-grow p-2 border rounded-md mt-2 w-full bg-blue-400">Download manifest</button>
      </div>

      <div class="border-2 p-2 m-2 rounded-xl border-2">
        <div>
          <div class="text-left"><span class="font-bold">OpenAI API key</span><span class="text-xs">(ブラウザに保存します)</span></div>
          <div>
            <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="apiKey" />
          </div>
        </div>
      </div>
      <div class="border-2 p-2 m-2 rounded-xl border-2">
        <div v-if="true">
          Debug View (read only)<br />
          manifest<br />
          <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(manifest, null, '\t')" rows="20" />
          Function:
          <div class="flex-grow p-2 border rounded-md mt-2 w-full text-left">
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(JSON.parse(functions), null, '\t')" rows="20" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-4/12">
      <div class="border-2 p-2 rounded-xl border-2 m-2">
        <h2 class="font-bold text-xl">Chat Area</h2>
        <chat-message :apiKey="apiKey" :manifest="manifest" ref="chatMessageRef" />
      </div>
      <div class="text-left border-2 p-2 rounded-xl border-2 m-2">
        <div>
          <b>Sample</b>
        </div>
        <div>
          {{ manifest.sample }}
        </div>
        <button @click="setSample" class="flex-grow p-2 border rounded-md mt-2 w-full bg-blue-400">Set Sample</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { ManifestData } from "slashgpt";

import ChatMessage from "@/components/editor/ChatMessage.vue";
import FunctionEditor from "@/components/editor/FunctionEditor.vue";

export default defineComponent({
  components: {
    ChatMessage,
    FunctionEditor,
  },
  setup() {
    const apiKey = ref(localStorage.getItem("apiKey") ?? "");

    const title = ref(localStorage.getItem("title") ?? "");
    const description = ref(localStorage.getItem("description") ?? "");
    const prompt = ref(localStorage.getItem("prompt") ?? "");
    const temperature = ref(localStorage.getItem("temperature") ?? "");

    const functions = ref(localStorage.getItem("functions") ?? "{}");
    const actions = ref(localStorage.getItem("actions") ?? "");
    const sample = ref(localStorage.getItem("sample") ?? "");

    const chatMessageRef = ref();

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
    watch(actions, () => {
      try {
        const json = JSON.parse(actions.value);
        const newStr = JSON.stringify(json, null, "\t");
        if (newStr !== actions.value) {
          actions.value = newStr;
        }
      } catch (e) {
        console.log(e);
        return {};
      }
    });

    const manifest = computed(() => {
      return {
        title: title.value,
        prompt: (prompt.value || "").split("\n"),
        about: "",
        bot: "",
        temperature: 0.7,
        actions: actions_object.value,
        functions: function_object.value,
        sample: sample.value,
      } as ManifestData;
    });
    const defautlAction = {
      rest: {
        type: "rest",
        url: "",
      },
      graphql: {
        type: "graphQL",
        url: "",
      },
      message_template: {
        type: "message_template",
        message: "",
      },
      data_url: {
        type: "data_url",
        template_message: "template message",
        mime_type: "text/calendar",
        message: "",
      },
    };

    const addActionsElement = (params: { name: string; actionType: string }) => {
      const tmp = actions_object.value;
      tmp[params.name] = defautlAction[params.actionType];
      const newStr = JSON.stringify(tmp, null, "\t");
      actions.value = newStr;
    };
    const removeActionsElement = (params: { name: string }) => {
      if (actions_object.value[params.name]) {
        const tmp = actions_object.value;
        delete tmp[params.name];
        const newStr = JSON.stringify(tmp, null, "\t");
        actions.value = newStr;
      }
    };

    watch(apiKey, () => {
      localStorage.setItem("apiKey", apiKey.value);
    });
    watch(title, () => {
      localStorage.setItem("title", title.value);
    });
    watch(description, () => {
      localStorage.setItem("description", description.value);
    });
    watch(prompt, () => {
      localStorage.setItem("prompt", prompt.value);
    });
    watch(temperature, () => {
      localStorage.setItem("temperature", temperature.value);
    });
    watch(functions, () => {
      localStorage.setItem("functions", functions.value);
    });
    watch(actions, () => {
      localStorage.setItem("actions", actions.value);
    });
    watch(sample, () => {
      localStorage.setItem("sample", sample.value);
    });

    const updateData = (data: { [key: string]: string }) => {
      // const { title, description, prompt, temperature, functions, actions } = data.manifest;
      title.value = data.manifest.title || "";
      description.value = data.manifest.description || "";
      prompt.value = data.manifest.prompt.join("\n") || "";
      temperature.value = String(data.manifest.temperature || 0.7);
      functions.value = JSON.stringify(data.manifest.functions, null, "\t") || "";
      actions.value = JSON.stringify(data.manifest.actions, null, "\t") || "";
      sample.value = data.manifest.sample || "";
    };

    const setSample = () => {
      chatMessageRef.value.userInput = sample.value;
    };
    const download = () => {
      const blob = new Blob([JSON.stringify(manifest.value, null, "\t")], {
        type: `application/json`,
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "manifest.json";
      link.click();
    };
    return {
      apiKey,
      title,
      description,
      prompt,
      temperature,
      functions,
      actions,

      download,

      sample,
      setSample,
      chatMessageRef,

      addActionsElement,
      removeActionsElement,

      manifest,

      updateData,
    };
  },
});
</script>
