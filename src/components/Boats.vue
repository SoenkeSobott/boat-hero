<template>
  <div>
    <form @submit.prevent="addBoat">
      <label for="name">Name</label>
      <input id="name" v-model="newBoat.name" required />

      <label for="description">Description</label>
      <input id="description" v-model="newBoat.description" required />

      <button type="submit">Add Boat</button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="boat in boats" :key="boat.id">
          <td>{{ boat.id }}</td>
          <td>{{ boat.name }}</td>
          <td>{{ boat.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const boats = ref([]);
    const newBoat = reactive({ name: "", description: "" });

    const addBoat = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const response = await axios.post(
            "https://boat-service.azurewebsites.net/api/boats",
            newBoat,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          boats.value.push(response.data); // Add the newly created boat to the list
          newBoat.name = ""; // Clear the form fields
          newBoat.description = "";
        } catch (err) {
          console.error(err);
        }
      }
    };

    onMounted(async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const response = await axios.get(
            "https://boat-service.azurewebsites.net/api/boats",
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          boats.value = response.data;
        } catch (err) {
          console.error(err);
        }
      }
    });

    return {
      boats,
      newBoat,
      addBoat,
    };
  },
};
</script>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
</style>
