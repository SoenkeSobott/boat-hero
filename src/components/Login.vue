<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label>Username:</label>
        <input v-model="credentials.username" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="credentials.password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const credentials = ref({ username: "", password: "" });
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post(
          "https://boat-service.azurewebsites.net/api/login",
          credentials.value
        );
        if (response.status === 200 && response.data) {
          localStorage.setItem("jwt", response.data.token);
          router.push("/boats"); // Navigate to BoatsPage
        } else {
          console.log("Error logging in");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return { credentials, login };
  },
};
</script>

