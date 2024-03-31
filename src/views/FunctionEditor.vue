<template>
  <div>
    <div class="flex">
      <div class="inline-flex items-center justify-center">
        Function<span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="openFunctionCreate">add_circle </span>
      </div>
    </div>

    <div v-for="(func, k) in functions" class="text-left border rounded-md p-2" :key="k">
      <div>
        <span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="removeFunction(k)">remove_circle </span>
        <span class="font-bold">Name</span>: <input v-model="func.name" class="flex-grow p-2 border rounded-md mt-2" />
      </div>
      <div><span class="font-bold">Description</span>: <input v-model="func.description" class="flex-grow p-2 border rounded-md mt-2" /></div>
      <div>
        <span class="font-bold">Parameters</span>:
        <div v-for="(prop, j) in Object.keys(func.parameters.properties || {})" :key="j" class="flex-grow p-2 border rounded-md mt-2">
          <div>Name: {{ prop }}</div>
          <div>Type: {{ func.parameters.properties[prop].type }}</div>
          <div>Description: <input v-model="func.parameters.properties[prop].description" class="flex-grow p-2 border rounded-md mt-2" /></div>
        </div>
      </div>
    </div>
  </div>
  <FunctionNewModal v-if="toggleCreateFunction" @closeModal="openFunctionCreate" @addFunctionParam="addFunctionParam"></FunctionNewModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";
import FunctionNewModal from "@/views/FunctionNewModal.vue";

export default defineComponent({
  components: {
    FunctionNewModal,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const functions = ref([]);
    const { modelValue } = toRefs(props);

    watch(
      modelValue,
      () => {
        functions.value = JSON.parse(modelValue.value);
      },
      { immediate: true },
    );
    watch(
      functions,
      (v) => {
        emit("update:modelValue", JSON.stringify(v));
      },
      { deep: true },
    );

    const toggleCreateFunction = ref(false);
    const openFunctionCreate = () => {
      toggleCreateFunction.value = !toggleCreateFunction.value;
    };
    const addFunctionParam = (name: string) => {
      const tmp = functions.value;
      tmp.push({
        name: name,
        description: "",
        parameters: {
          type: "object",
          properties: {},
        },
      });
      openFunctionCreate();
    };
    const removeFunction = (key: number) => {
      functions.value = functions.value.filter((_, n) => {
        return n !== key;
      });
    };
    return {
      functions,

      addFunctionParam,
      removeFunction,

      openFunctionCreate,
      toggleCreateFunction,
    };
  },
});
</script>
