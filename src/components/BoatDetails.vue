<template>
  <div class="container">
    <button @click="goBack" class="back-button">Back to Overview</button>
    <h1>Boat Details</h1>
    <!-- TODO: Add loading state when the data is being fetched -->
    <div v-if="boat" class="boat-details">
      <p><strong>ID:</strong> {{ boat.id }}</p>
      <p><strong>Name:</strong> {{ boat.name }}</p>
      <p><strong>Description:</strong> {{ boat.description }}</p>
    </div>

    <!-- TODO: Add form validation to prevent empty fields or invalid inputs -->
    <form @submit.prevent="updateBoat" class="boat-form" v-if="boat">
      <h2>Edit Selected Boat</h2>
      <input v-model="boat.name" type="text" placeholder="Boat Name" />
      <input
        v-model="boat.description"
        type="text"
        placeholder="Boat Description"
      />
      <button type="submit" class="submit-button">Update Boat</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import api from "@/api.js";

const handleError = (err, router) => {
  console.error(err);
  router.push("/");
};

export default {
  props: {
    id: String,
  },
  setup(props) {
    const router = useRouter();
    const boat = ref(null);

    const fetchBoat = async () => {
      try {
        const response = await api.get(`/boats/${props.id}`);
        boat.value = response.data;
      } catch (err) {
        handleError(err, router);
      }
    };

    const updateBoat = async () => {
      // TODO: Handle updating status and success/error messages for better UX
      try {
        await api.put(`/boats/${boat.value.id}`, boat.value);
      } catch (err) {
        handleError(err, router);
      }
    };

    const goBack = () => {
      router.push("/boats");
    };

    watch(() => props.id, fetchBoat, { immediate: true });

    return { boat, updateBoat, goBack };
  },
};
</script>


<style scoped>
.container {
  width: 80%;
  margin: auto;
  padding-top: 20px;
}

.back-button,
.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.boat-details,
.boat-form {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.boat-form h2,
.back-button {
  margin-bottom: 20px;
}

.boat-form input {
  /* TODO: Consider adding CSS for error state (e.g. border-color: red)*/
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
