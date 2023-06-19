<template>
  <header class="header">
    <h1 class="title">Boat Hero</h1>
    <h3 v-if="username">{{ username }}</h3>
    <div class="auth-section">
      <button v-if="isAuthenticated" @click="logout" class="auth-button">
        Logout
      </button>
    </div>
  </header>
</template>

<script>
// TODO: Implement more robust error handling. Redirecting to the root page
// on every error might not be the best user experience.

// TODO: In order to make this truly production-ready, consider using a UI library
// such as Vuetify or Quasar for pre-built, fully-featured components.

// TODO: Consider using a more complete state management solution like Vuex.

import { useAuth } from "@/authStore.js";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const { isAuthenticated, username, logout } = useAuth();

    const performLogout = () => {
      logout();
      router.push("/");
    };

    return { isAuthenticated, username, logout: performLogout };
  },
};
</script>

<style scoped>
/* TODO: Consider using a CSS preprocessor like SCSS or LESS for more
   advanced styling capabilities such as variables and mixins.

   TODO: Extract common styles to a separate file and import where necessary
   to maintain DRY (Don't Repeat Yourself) principle.*/

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
}

.title {
  margin: 0;
}

.auth-section {
  display: flex;
  align-items: center;
}

.auth-button {
  margin-left: 10px;
  padding: 5px 10px;
}
</style>
