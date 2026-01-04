import { toast } from "sonner";
import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");

    return response.data.data;
  } catch (error) {
    console.log(error, ":::error");

    toast.error("Failed to fetch users");
  }
};

export const addUser = async (payload: any) => {
  const response = await axiosInstance.post("/users", payload);
  return response.data;
};
export const updateUser = async (id: number, payload: any) => {
  const response = await axiosInstance.put(`/users/${id}`, payload);
  return response.data;
};
export const deleteuser = async (id: number) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data.data;
};
export const updatecategories = async (id: number, payload: any) => {
  const response = await axiosInstance.put(`/categories/${id}`, payload);
  return response.data;
};
export const deletecategory = async (id: number) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};
export const addCategory = async (payload: any) => {
  const response = await axiosInstance.post("/categories", payload);
  return response.data;
};

export const addExpense = async (payload: any) => {
  const response = await axiosInstance.post("/expenses", payload);
  return response.data;
};
export const getExpenses = async (filters?: {
  user_id?: number;
  category_id?: number;
  start_date?: string;
  end_date?: string;
}) => {
  const response = await axiosInstance.get("/expenses", {
    params: filters,
  });
  return response.data.data;
};
export const getset1 = async () => {
  const response = await axiosInstance.get("/expenses/set1");
  return response.data.data;
};
export const getset2 = async () => {
  const response = await axiosInstance.get("/expenses/set2");
  return response.data.data;
};
export const getset3 = async () => {
  const response = await axiosInstance.get("/expenses/set3");
  return response.data.data;
};
export const updateExpense = async (id: number, payload: any) => {
  const response = await axiosInstance.put(`/expenses/${id}`, payload);
  return response.data;
};

export const deleteExpense = async (id: number) => {
  const response = await axiosInstance.delete(`/expenses/${id}`);
  return response.data;
};
