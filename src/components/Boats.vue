<template>
  <div class="container">
    <!-- Boat creation form -->
    <add-boat @boat-added="fetchBoats()"></add-boat>

    <!-- Boat listing -->
    <!-- TODO: Consider adding a loading spinner or message while the boats data is being fetched. -->
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
        <!-- TODO: Consider adding a message for when there are no boats to display. -->
        <tr v-for="boat in boats" :key="boat.id" @click="goToDetails(boat.id)">
          <td>{{ boat.id }}</td>
          <td>{{ boat.name }}</td>
          <td>{{ boat.description }}</td>
          <td>
            <!-- TODO: Consider adding a confirmation dialog before the deletion of a boat. -->
            <button @click.stop="deleteBoat(boat)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AddBoat from "./AddBoat.vue";
import api from "@/api.js";

export default {
  components: {
    AddBoat,
  },
  setup() {
    const router = useRouter();
    const boats = ref([]);

    const fetchBoats = async () => {
      try {
        const response = await api.get("/boats");
        boats.value = response.data;
      } catch (err) {
        handleError(err);
      }
    };

    onMounted(fetchBoats);

    const goToDetails = (id) => {
      router.push({ name: "BoatDetails", params: { id: id } });
    };

    const deleteBoat = async (boat) => {
      try {
        await api.delete(`/boats/${boat.id}`);
        const index = boats.value.indexOf(boat);
        boats.value.splice(index, 1);
      } catch (err) {
        handleError(err);
      }
    };

    const handleError = (err) => {
      // TODO: Consider showing error messages in the UI instead of just console.error and navigation.
      console.error(err);
      router.push("/");
    };

    return {
      boats,
      fetchBoats,
      goToDetails,
      deleteBoat,
    };
  },
};
</script>


<style scoped>
.container {
  width: 80%;
  margin: auto;
  padding-top: 20px;
}

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

.close-btn {
  background: none;
  border: none;
  font-size: 1.2em;
  float: right;
  cursor: pointer;
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

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #007bff;
  color: white;
}

.table td {
  background-color: #f9f9f9;
}

.table button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

/* TODO: Consider using CSS variables to make the theme easier to change. */
</style>
