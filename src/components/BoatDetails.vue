<template>
  <div class="container">
    <button @click="goBack" class="back-button">Back to Overview</button>
    <h1>Boat Details</h1>
    <div v-if="boat" class="boat-details">
      <p><strong>ID:</strong> {{ boat.id }}</p>
      <p><strong>Name:</strong> {{ boat.name }}</p>
      <p><strong>Description:</strong> {{ boat.description }}</p>
    </div>

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
import { ref, onBeforeMount, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const authenticate = (router) => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    router.push("/");
  }
  return jwt;
};

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
      const jwt = authenticate(router);
      if (jwt) {
        try {
          const response = await axios.get(
            `https://boat-service.azurewebsites.net/api/boats/${props.id}`,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          boat.value = response.data;
        } catch (err) {
          handleError(err, router);
        }
      }
    };

    const updateBoat = async () => {
      const jwt = authenticate(router);
      if (jwt) {
        try {
          await axios.put(
            `https://boat-service.azurewebsites.net/api/boats/${boat.value.id}`,
            boat.value,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
        } catch (err) {
          handleError(err, router);
        }
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
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
