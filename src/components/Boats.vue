<template>
  <div>
    <h2>Boats</h2>
    <ul>
      <li v-for="boat in boats" :key="boat.id">{{ boat.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "BoatsPage",
  setup() {
    const boats = ref([]);

    onMounted(async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const response = await axios.get(
            "https://boat-service.azurewebsites.net/api/boats",
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          boats.value = response.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        // Handle case when there is no JWT
        router.push("/");
      }
    });

    return { boats };
  },
};
</script>
