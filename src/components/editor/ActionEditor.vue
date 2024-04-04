<template>
  <div class="text-left border rounded-md p-2 mb-2">
    <div v-for="(action_name, k) in Object.keys(actions)" :key="k" class="text-left border rounded-md p-2 mb-2">
      <div>name: {{ action_name }}</div>
      <div v-if="actions[action_name]['type'] === 'message_template'">
        message: <input v-model="actions[action_name]['message']" class="flex-grow p-2 border rounded-md mt-2 w-full" />
      </div>
      <div v-if="actions[action_name]['type'] === 'rest'">
        url: <input v-model="actions[action_name]['url']" class="flex-grow p-2 border rounded-md mt-2 w-full" /> method:
        <input v-model="actions[action_name]['method']" class="flex-grow p-2 border rounded-md mt-2 w-full" />
      </div>
      <div v-if="actions[action_name]['type'] === 'graphQL'">
        url: <input v-model="actions[action_name]['url']" class="flex-grow p-2 border rounded-md mt-2 w-full" />
      </div>
      <div v-if="actions[action_name]['type'] === 'data_url'">
        template_message: <input v-model="actions[action_name]['template_message']" class="flex-grow p-2 border rounded-md mt-2 w-full" /> mime_type:
        <input v-model="actions[action_name]['mime_type']" class="flex-grow p-2 border rounded-md mt-2 w-full" /> message:
        <input v-model="actions[action_name]['message']" class="flex-grow p-2 border rounded-md mt-2 w-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const actions = ref({});
    const { modelValue } = toRefs(props);
    watch(
      modelValue,
      () => {
        try {
          actions.value = JSON.parse(modelValue.value);
        } catch (e) {
          actions.value = {};
        }
      },
      { immediate: true },
    );
    watch(
      actions,
      (v) => {
        emit("update:modelValue", JSON.stringify(v));
      },
      { deep: true },
    );

    return {
      actions,
    };
  },
});
</script>
