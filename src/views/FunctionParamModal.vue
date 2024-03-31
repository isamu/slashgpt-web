<template>
  <div>
    <Modal @closeModal="closeModal">
      <div><span class="font-bold">Name</span>: <input v-model="inputName" class="p-2 border rounded-md mt-2" /></div>
      <div>
        DataType:
        <select v-model="selectedParamValue">
          <option v-for="(option, index) in functionParametersTypes" :value="option" :key="index">
            {{ option }}
          </option>
        </select>
      </div>
      <div>
        <button @click="addFunctionParam" class="border rounded-md">Add</button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "@/components/Modal.vue";

const functionParametersTypes = ["number", "string"];

export default defineComponent({
  components: {
    Modal,
  },
  emits: ["addFunctionParam", "closeModal"],
  setup(_, { emit }) {
    const inputName = ref("");

    const addFunctionParam = () => {
      emit("addFunctionParam", {
        name: inputName.value,
        paramType: selectedParamValue.value,
      });
    };
    const closeModal = () => {
      emit("closeModal");
    };

    const selectedParamValue = ref(functionParametersTypes[0]);

    return {
      inputName,

      addFunctionParam,
      closeModal,

      functionParametersTypes,
      selectedParamValue,
    };
  },
});
</script>
