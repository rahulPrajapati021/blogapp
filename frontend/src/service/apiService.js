import axios from "axios";
import { useAuth } from "../context/AuthContext";

let logoutHandler = null;
export function setLogoutHandler(fn) {
  logoutHandler = fn;
}

class ApiService {
  api;
  constructor() {
    // instance for axios created
    this.api = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // interceptor for token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // interceptor for error response
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          if (logoutHandler) {
            logoutHandler();
          }
        }

        // console.log(error.response);
        console.log(error);
        let msg = "Something went wrong";
        if (error.response?.data?.msg) {
          msg = error.response.data.msg;
        }
        error.message = msg;
        return Promise.reject(error);
      },
    );
  }

  // methods onward

  // authentication based request ahead
  async login(email, password) {
    const response = await this.api.post("/api/v1/auth/login", {
      email,
      password,
    });
    return response.data;
  }
  async register(email, password, fullName) {}
  logout() {
  }

  // user functions
  // get List of Published Post
  async getPublishedList() {
    const response = await this.api.get("/api/v1/posts");
    return response.data;
  }
  async getDraftList() {
    const response = await this.api.get("/api/v1/posts/drafts");
    return response.data;
  }
  async getCategoryList() {
    const response = await this.api.get("/api/v1/categories");
    return response.data;
  }
  async createTags(tagList) {
    const response = await this.api.post("/api/v1/tags", {names: tagList});
    return response.data;
  }

  async createPost(formdata) {
    const response = await this.api.post("/api/v1/posts", formdata);
    return response.data;
  }
  async getPost(id) {
    const response = await this.api.get("/api/v1/posts/" + id);
    return response.data;
  }

  async updatePost(id, data) {
    const response = await this.api.put("/api/v1/posts/" +id, data);
    return response.data;
  }
}

export const apiService = new ApiService();
