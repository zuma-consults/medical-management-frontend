// user.service.ts
import { AxiosRequestConfig } from "axios";
import { request } from "../lib/api";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
}

export interface LoginData {
  username: string;
  password?: string;
}

export interface UsersResponse {
  users: User[];
}

class UserService {
  public async register(user: User) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "/register",
      data: user,
    };

    const response = await request(options);
    return response;
  }

  public async getUsers() {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "/users",
    };
    const response = await request(options);
    return response;
  }

  public async getDoctors() {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "/doctors",
    };
    const response = await request(options);
    return response;
  }

  public async getUsersByToken() {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `/token`,
    };
    const response = await request(options);
    return response;
  }

  public async deleteUser(id: string) {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `/user/${id}`,
    };
    return request(options);
  }

  public async login(data: LoginData) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "/login",
      data,
    };

    return await request(options);
  }

  public async updateUser(id: string, data: object) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/user/${id}`,
      data,
    };

    return await request(options);
  }

  public async activate(data: LoginData) {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: "/activate",
      data,
    };
    const response = await request(options);

    return response;
  }

  public async forgot(data: { username: string }) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "/forgot",
      data,
    };

    return await request(options);
  }

  public async reset(data: { password: string }) {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: "/reset",
      data,
    };
    const response = await request(options);

    return response;
  }
}

export default new UserService();
