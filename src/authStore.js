import { ref } from 'vue';

const isAuthenticated = ref(!!localStorage.getItem("jwt"));

export function login(token) {
    localStorage.setItem("jwt", token);
    isAuthenticated.value = true;
}

export function logout() {
    localStorage.removeItem("jwt");
    isAuthenticated.value = false;
}

export function useAuth() {
    return { isAuthenticated, login, logout };
}
