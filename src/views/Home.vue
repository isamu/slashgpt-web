<template>
  <div class="home">
    <div class="w-10/12 m-auto flex">
      <div class="w-1/2">
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

          <FunctionEditor v-model="functions" @addActionsElement="addActionsElement" />
          <div>Actions</div>
          <div>
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="actions" rows="10"></textarea>
          </div>

          <div>
            <div class="text-left font-bold">API key</div>
            <div>
              <input class="flex-grow p-2 border rounded-md mt-2 w-full" v-model="apiKey" />
            </div>
          </div>
          <!--
          manifest<br />
          <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(manifest, null, '\t')" rows="20" />
          Function:
          <div class="flex-grow p-2 border rounded-md mt-2 w-full text-left">
            <textarea class="flex-grow p-2 border rounded-md mt-2 w-full" :value="JSON.stringify(JSON.parse(functions), null, '\t')" rows="20" />
          </div>
          -->
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
        prompt: [prompt.value],
        about: "",
        bot: "",
        temperature: 0.7,
        actions: actions_object.value,
        functions: function_object.value,
        sample: "",
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

      addActionsElement,

      manifest,
    };
  },
});
</script>
