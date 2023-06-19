<template>
  <!-- TODO: Add server-side validation error messages -->
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="attemptLogin" class="login-form">
      <div class="input-group">
        <label>Username:</label>
        <!-- TODO: Add client-side validation -->
        <input
          v-model="credentials.username"
          type="text"
          required
          class="input-field"
        />
      </div>
      <div class="input-group">
        <label>Password:</label>
        <!-- TODO: Add client-side validation -->
        <input
          v-model="credentials.password"
          type="password"
          required
          class="input-field"
        />
      </div>
      <!-- TODO: Disable button during login process -->
      <button type="submit" class="submit-button">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuth } from "@/authStore.js";

export default {
  name: "Login",
  setup() {
    const credentials = ref({ username: "", password: "" });
    const router = useRouter();
    const { login } = useAuth();

    const attemptLogin = async () => {
      try {
        const response = await axios.post(
          "https://boat-service.azurewebsites.net/api/login",
          credentials.value
        );
        if (response.status === 200 && response.data) {
          login(response.data.token, credentials.value.username);
          router.push("/boats");
        } else {
          console.log("Error logging in");
          // TODO: Display login error message to user
        }
      } catch (error) {
        console.log(error);
        // TODO: Handle different types of errors (network, server, validation, etc.) appropriately
      }
    };

    return { credentials, attemptLogin };
  },
};
</script>

<style scoped>
/* TODO: Consider using a CSS preprocessor like SCSS or LESS to make styling more maintainable */

.container {
  width: 80%;
  margin: auto;
  padding-top: 20px;
}

.login-form {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 10px;
}

.input-field {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}
</style>
