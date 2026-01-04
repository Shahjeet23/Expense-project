export type User = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive"; // you can extend this if needed
};

export type ApiResponse<T> = {
  status: "success" | "error";
  data: T;
};
export type TopDay = {
  user_id: number;
  expense_date: string;
  total_amount: string;
};

export type UserTopDays = {
  user_id: number;
  top_days: TopDay[];
};
export type UserTotalRow = {
  user_id: number;
  user_name: string;
  total_amount: number;
  top_days: TopDay[];
};
export interface Set2 {
  user_id: number;
  month: string;
  user_name: string;
  current_month_total: number;
  previous_month_total: number;
  percentage_change: string;
}

export interface Set3 {
  user_id: number;
  user_name: string;
  predicted_next_month_expense: number;
}
