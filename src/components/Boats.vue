<template>
  <div>
    <!-- Boat creation form -->
    <form @submit.prevent="addBoat">
      <label for="name">Name</label>
      <input id="name" v-model="newBoat.name" required />

      <label for="description">Description</label>
      <input id="description" v-model="newBoat.description" required />

      <button type="submit">Add Boat</button>
    </form>

    <!-- Boat listing -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="boat in boats" :key="boat.id">
          <td>{{ boat.id }}</td>
          <td>{{ boat.name }}</td>
          <td>{{ boat.description }}</td>
          <td>
            <button @click="deleteBoat(boat)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
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
      } else {
        router.push("/");
      }
    });

    const deleteBoat = async (boat) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          await axios.delete(
            `https://boat-service.azurewebsites.net/api/boats/${boat.id}`,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          const index = boats.value.indexOf(boat);
          boats.value.splice(index, 1);
        } catch (err) {
          console.error(err);
        }
      }
    };

    return {
      boats,
      newBoat,
      addBoat,
      deleteBoat,
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
