<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, toRefs } from "vue";
export default defineComponent({
  props: {
    modelValue: String,
  },
  setup(props, {emit}) {
    const functions = ref({});
    const { modelValue } = toRefs(props);

    watch(modelValue, () => {
      functions.value = JSON.parse(modelValue.value);
    }, {  immediate: true });
    watch(functions, (v) => {
      emit("update:modelValue", JSON.stringify(v) )
    }, { deep: true});

    return {
      functions,
    };
  },
});
</script>

