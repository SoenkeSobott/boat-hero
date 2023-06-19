import { ref } from 'vue';

const isAuthenticated = ref(!!localStorage.getItem("jwt"));
const username = ref("");

export function login(token, user) {
    localStorage.setItem("jwt", token);
    isAuthenticated.value = true;
    username.value = user;
}

export function logout() {
    localStorage.removeItem("jwt");
    isAuthenticated.value = false;
    username.value = "";
}

export function useAuth() {
    return { isAuthenticated, username, login, logout };
}
