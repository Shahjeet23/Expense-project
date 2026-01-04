import { getCategories, getExpenses, getUsers } from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getusers = createAsyncThunk("getusers", async () => {
  try {
    const res: any = await getUsers();
    return res;
  } catch (error) {
    console.log("ERROR :GET USER", error);
  }
});
export const getcate = createAsyncThunk("getcate", async () => {
  try {
    const res: any = await getCategories();
    return res;
  } catch (error) {
    console.log("ERROR :GET CATEGORY", error);
  }
});
export const getexpense = createAsyncThunk(
  "getexpense",
  async (filters?: {
    user_id?: number;
    category_id?: number;
    start_date?: string;
    end_date?: string;
  }) => {
    try {
      const res: any = await getExpenses(filters);
      return res;
    } catch (error) {
      console.log("ERROR :GET CATEGORY", error);
    }
  }
);
