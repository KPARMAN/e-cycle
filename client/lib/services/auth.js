import ApiClient from "../api.js";

export const authService = {
  async register(userData) {
    const { name, email, password } = userData;
    const response = await ApiClient.post("/api/auth/register", {
      name,
      email,
      password,
    });

    if (response.token) {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  async login(credentials) {
    const { email, password } = credentials;
    const response = await ApiClient.post("/api/auth/login", {
      email,
      password,
    });

    if (response.token) {
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  getToken() {
    return localStorage.getItem("auth_token");
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
