<template>
  <header class="header">
    <h1 class="title">Boat App</h1>
    <div class="auth-section">
      <button v-if="!isAuthenticated" @click="goToLogin" class="auth-button">
        Login
      </button>
      <button v-else @click="logout" class="auth-button">Logout</button>
    </div>
  </header>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();

    const isAuthenticated = computed(() => !!localStorage.getItem("jwt"));

    const goToLogin = () => {
      router.push("/");
    };

    const logout = () => {
      localStorage.removeItem("jwt");
      router.push("/");
    };

    return { isAuthenticated, goToLogin, logout };
  },
};
</script>

<style scoped>
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

.username {
  margin-right: 20px;
}

.auth-button {
  margin-left: 10px;
  padding: 5px 10px;
}
</style>
