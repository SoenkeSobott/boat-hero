<template>
  <div class="container">
    <!-- Boat creation form -->
    <form @submit.prevent="addBoat" class="boat-form">
      <h2>Add a New Boat</h2>
      <label for="name">Name</label>
      <input id="name" v-model="newBoat.name" required />

      <label for="description">Description</label>
      <input id="description" v-model="newBoat.description" required />

      <button type="submit">Add Boat</button>
    </form>

    <!-- Boat editing form -->
    <form v-if="selectedBoat" @submit.prevent="updateBoat" class="boat-form">
      <h2>
        Edit Selected Boat
        <button type="button" @click="cancelUpdate" class="close-btn">X</button>
      </h2>
      <label for="edit-name">Name</label>
      <input id="edit-name" v-model="selectedBoat.name" required />

      <label for="edit-description">Description</label>
      <input
        id="edit-description"
        v-model="selectedBoat.description"
        required
      />

      <button type="submit">Update Boat</button>
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
        <tr v-for="boat in boats" :key="boat.id" @click="selectedBoat = boat">
          <td>{{ boat.id }}</td>
          <td>{{ boat.name }}</td>
          <td>{{ boat.description }}</td>
          <td>
            <button @click.stop="deleteBoat(boat)">Delete</button>
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
    const selectedBoat = ref(null);

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

    const updateBoat = async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt && selectedBoat.value) {
        try {
          await axios.put(
            `https://boat-service.azurewebsites.net/api/boats/${selectedBoat.value.id}`,
            selectedBoat.value,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          selectedBoat.value = null;
        } catch (err) {
          console.error(err);
        }
      }
    };

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
      selectedBoat,
      addBoat,
      updateBoat,
      deleteBoat,
    };
  },
  methods: {
    cancelUpdate() {
      this.selectedBoat = null;
    },
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
</style>
