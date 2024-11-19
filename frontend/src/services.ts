import axios from "axios";
import { User, UserUpdate } from "../../models/User";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const createUser = async (userData: User) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const patchUser = async (id: string, userUpdate: UserUpdate) => {
  try {
    const response = await api.patch(`/users/${id}`, userUpdate);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting user with ID ${id}:`, error);
    throw error;
  }
};

export const getBuildings = async (search?: string) => {
  try {
    const response = await api.get("/buildings", {
      params: { search },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBuildingById = async (id: string) => {
  try {
    const response = await api.get(`/buildings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting building with ID ${id}:`, error);
    throw error;
  }
};
