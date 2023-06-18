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
import axios from "axios";

// Create a default axios instance
const api = axios.create({
  baseURL: "https://boat-service.azurewebsites.net/api",
  headers: { Authorization: `Bearer ${getJwtToken()}` },
});

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
    handleError(err);
  }
}

function handleError(err) {
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

