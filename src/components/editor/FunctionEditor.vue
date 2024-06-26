<template>
  <div>
    <div class="flex mt-2">
      <div class="inline-flex items-center justify-center font-bold">
        Function<span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="toggleAddMethod">add_circle </span>
      </div>
    </div>

    <div v-for="(func, k) in functions" class="text-left border rounded-md p-2 mb-2" :key="k">
      <div>
        <span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="removeFunctionMethod(k)">remove_circle </span>
        <span class="font-bold">Name</span>: <input v-model="func.name" class="flex-grow p-2 border rounded-md mt-2" />
      </div>
      <div><span class="font-bold">Description</span>: <input v-model="func.description" class="flex-grow p-2 border rounded-md mt-2" /></div>
      <div>
        <span class="font-bold">Parameters</span>:<span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="toggleAddParam(k)"
          >add_circle
        </span>
        <div v-for="(prop, j) in Object.keys(func.parameters.properties || {})" :key="j" class="flex-grow p-2 border rounded-md mt-2">
          <div>
            <span class="material-icons text-warmgray-600 mr-2 text-lg cursor-pointer" @click="removeFunctionParam(k, prop)">remove_circle </span>
            Name: {{ prop }}
          </div>
          <div>Type: {{ func.parameters.properties[prop].type }}</div>
          <div>Description: <input v-model="func.parameters.properties[prop].description" class="flex-grow p-2 border rounded-md mt-2" /></div>
        </div>
      </div>
    </div>
  </div>
  <FunctionNewModal v-if="isOpenNew" @closeModal="toggleAddMethod" @addFunctionMethod="addFunctionMethod"></FunctionNewModal>
  <FunctionParamModal v-if="isOpenParamNew" @closeModal="toggleAddParam" @addFunctionParam="addFunctionParam"></FunctionParamModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";
import FunctionNewModal from "@/components/editor/functions/FunctionNewModal.vue";
import FunctionParamModal from "@/components/editor/functions/FunctionParamModal.vue";

export default defineComponent({
  components: {
    FunctionNewModal,
    FunctionParamModal,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "addActionsElement", "removeActionsElement"],
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

    const isOpenNew = ref(false);
    const toggleAddMethod = () => {
      isOpenNew.value = !isOpenNew.value;
    };

    const currentMethodKey = ref(0);
    const isOpenParamNew = ref(false);
    const toggleAddParam = (key: number) => {
      currentMethodKey.value = key;
      isOpenParamNew.value = !isOpenParamNew.value;
    };
    const addFunctionMethod = (params: { name: string; actionType: string }) => {
      const tmp = functions.value;
      tmp.push({
        name: params.name,
        description: "",
        parameters: {
          type: "object",
          properties: {},
        },
      });
      emit("addActionsElement", { name: params.name, actionType: params.actionType });
      toggleAddMethod();
    };
    const addFunctionParam = (params: { name: string; paramType: string }) => {
      const tmp = functions.value[currentMethodKey.value];
      tmp.parameters.properties[params.name] = {
        type: params.paramType,
        description: "",
      };
      toggleAddParam();
    };
    const removeFunctionMethod = (key: number) => {
      const keyName = functions.value[key].name;
      functions.value = functions.value.filter((_, n) => {
        return n !== key;
      });
      emit("removeActionsElement", { name: keyName });
    };
    const removeFunctionParam = (key: number, name: string) => {
      // console.log(key, name);
      delete functions.value[key]["parameters"]["properties"][name];
    };
    return {
      functions,

      addFunctionMethod,
      removeFunctionMethod,
      removeFunctionParam,

      addFunctionParam,

      toggleAddMethod,
      isOpenNew,

      toggleAddParam,
      isOpenParamNew,
    };
  },
});
</script>
