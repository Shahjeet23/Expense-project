import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getcate, getexpense, getusers } from "./extrareducer";

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}
export interface Expense {
  id: number;
  amount: string; // backend sends string like "500.00"
  date: string; // ISO date string
  description: string;
  created_at: string; // ISO datetime
  user_id: number;
  user_name: string;
  user_email: string;
  category_id: number;
  category_name: string;
}
export interface Category {
  id: number;
  name: string;
}

interface MasterState {
  users: User[];
  categories: Category[];
  expenses: Expense[];
  loading: boolean;
}

const initialState: MasterState = {
  users: [],
  categories: [],
  loading: false,
  expenses: [],
};

const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },

    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getusers.fulfilled, (state, action) => {
      state.users = action.payload || [];
    });
    builder.addCase(getcate.fulfilled, (state, action) => {
      state.categories = action.payload || [];
    });
    builder.addCase(getexpense.fulfilled, (state, action) => {
      state.expenses = action.payload || [];
    });
  },
});

export const { setUsers, setCategories, setLoading } = masterSlice.actions;

export default masterSlice.reducer;
