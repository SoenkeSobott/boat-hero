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

export default {
  name: "Login",
  setup() {
    const credentials = ref({ username: "", password: "" });

    const login = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/login",
          credentials.value
        );
        if (response.status === 200 && response.data) {
          // Store the token. In production, consider using a more secure way to store tokens.
          localStorage.setItem("jwt", response.data.token);
          // Redirect to home page or other place
        } else {
          // Handle error
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
