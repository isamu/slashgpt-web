<template>
  <div>
    <Modal @closeModal="closeModal">
      <div class="text-left">
        <div><span class="font-bold">Name</span>: <input v-model="inputName" class="p-2 border rounded-md mt-2" /></div>
        <div>
          <span class="font-bold">ActionType</span>:
          <select v-model="selectedActionValue" class="border rounded-md p-2 m-2">
            <option v-for="(option, index) in functionActionTypes" :value="option" :key="index">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div>
          <button @click="addFunctionMethod" class="border rounded-md m-2 p-2">Add</button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Modal from "@/components/Modal.vue";

const functionActionTypes = ["rest", "graphql", "message_template", "data_url"];

export default defineComponent({
  components: {
    Modal,
  },
  emits: ["addFunctionMethod", "closeModal"],
  setup(_, { emit }) {
    const inputName = ref("");

    const addFunctionMethod = () => {
      emit("addFunctionMethod", {
        name: inputName.value,
        actionType: selectedActionValue.value,
      });
    };
    const closeModal = () => {
      emit("closeModal");
    };

    const selectedActionValue = ref(functionActionTypes[0]);

    return {
      inputName,

      addFunctionMethod,
      closeModal,

      functionActionTypes,
      selectedActionValue,
    };
  },
});
</script>
