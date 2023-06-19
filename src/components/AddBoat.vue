<template>
  <form @submit.prevent="addBoat" class="boat-form">
    <h2>Add a New Boat</h2>
    <label for="name">Name</label>
    <input id="name" v-model="newBoat.name" required />

    <label for="description">Description</label>
    <input id="description" v-model="newBoat.description" required />

    <button type="submit">Add Boat</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "@/api.js";

export default {
  setup(_, { emit }) {
    const router = useRouter();
    const newBoat = reactive({ name: "", description: "" });

    const addBoat = async () => {
      try {
        await api.post("/boats", newBoat);
        newBoat.name = "";
        newBoat.description = "";
        emit("boat-added");
      } catch (err) {
        // TODO: Improve error handling, maybe show a message to the user
        handleError(err);
      }
    };

    return { newBoat, addBoat };
  },
};

function getJwtToken() {
  try {
    return localStorage.getItem("jwt");
  } catch (err) {
    // TODO: Add better error handling for case where getting JWT fails
    handleError(err);
  }
}

function handleError(err) {
  // TODO: Implement a more user-friendly way of handling errors, possibly with an error notification system
  console.error(err);
  router.push("/");
}
</script>

<style scoped>
.boat-form {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.boat-form h2 {
  margin-bottom: 20px;
}

.boat-form input {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

.boat-form button {
  /* TODO: Consider moving common styles to a separate stylesheet to avoid duplication */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
