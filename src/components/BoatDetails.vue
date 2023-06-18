<template>
  <div>
    <button @click="goBack">Back to Overview</button>
    <h1>Boat Details</h1>
    <div v-if="boat">
      <p>ID: {{ boat.id }}</p>
      <p>Name: {{ boat.name }}</p>
      <p>Description: {{ boat.description }}</p>
    </div>

    <form @submit.prevent="updateBoat" class="boat-form" v-if="boat">
      <h2>Edit Selected Boat</h2>
      <input v-model="boat.name" type="text" placeholder="Boat Name" />
      <input
        v-model="boat.description"
        type="text"
        placeholder="Boat Description"
      />
      <button type="submit">Update Boat</button>
    </form>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const router = useRouter();
    const boat = ref(null);

    onBeforeMount(async () => {
      const jwt = localStorage.getItem("jwt");
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
          console.error(err);
        }
      } else {
        router.push("/");
      }
    });

    const updateBoat = async () => {
      const jwt = localStorage.getItem("jwt");
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
          console.error(err);
        }
      }
    };

    const goBack = () => {
      router.push("/boats");
    };

    return { boat, updateBoat, goBack };
  },
};
</script>
