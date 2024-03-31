<template>
  <div>
    <Modal @closeModal="closeModal">
      name: type:
      <button @click="addFunctionParam">Add</button>
    </Modal>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  components: {
    Modal,
  },
  emits: ["addFunctionParam", "closeModal"],
  setup(_, { emit }) {
    const addFunctionParam = () => {
      console.log("ADD");
      emit("addFunctionParam", "hello");
    };
    const closeModal = () => {
      emit("closeModal");
    };
    return {
      addFunctionParam,
      closeModal,
    };
  },
});
</script>
