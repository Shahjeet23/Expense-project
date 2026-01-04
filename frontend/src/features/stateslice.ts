import { createSlice, type PayloadAction, } from "@reduxjs/toolkit"

type StatType =
    | "TOP_DAYS"
    | "MONTHLY_CHANGE"
    | "PREDICTION"

interface StatsState {
    activeStat: StatType
}

const initialState: StatsState = {
    activeStat: "TOP_DAYS",
}

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setActiveStat(state, action: PayloadAction<StatType>) {
            state.activeStat = action.payload
        },
    },
})

export const { setActiveStat } = statsSlice.actions
export default statsSlice.reducer
