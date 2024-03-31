<template>
  <div>
    <Modal @closeModal="closeModal">
      <div class="text-left">
        <div><span class="font-bold">Name</span>: <input v-model="inputName" class="p-2 border rounded-md mt-2" /></div>
        <div>
          <span class="font-bold">DataType</span>:
          <select v-model="selectedParamValue" class="border rounded-md p-2 m-2">
            <option v-for="(option, index) in functionParametersTypes" :value="option" :key="index">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div>
          <button @click="addFunctionParam" class="border rounded-md p-2 m-2">Add</button>
        </div>
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
