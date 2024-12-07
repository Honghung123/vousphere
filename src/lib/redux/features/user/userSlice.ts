"use client";
// todoSlice.js
import { UserStateType } from "@/lib/definitions";
import { createSlice, Slice } from "@reduxjs/toolkit";

export const initialState = (): { isLoggedIn: boolean; user: UserStateType } => {
    try {
        const ISSERVER = typeof window === "undefined";
        if (!ISSERVER) {
            const persistedData = localStorage.getItem("persist:root");
            if (persistedData) {
                const parsedData = JSON.parse(persistedData); // Parse chuỗi JSON
                return parsedData; // Tách dữ liệu state (nested JSON)
            }
        }
    } catch (error) {
        console.error("Error parsing persisted state:", error);
    }
    return {
        isLoggedIn: false,
        user: {
            id: null,
            name: null,
            username: null,
            email: null,
            status: null,
            role: null,
        },
    };
};
const userSlice: Slice<any> = createSlice({
    name: "user",
    initialState: initialState(),
    reducers: {
        storeUserState(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("persist:root", JSON.stringify(state));
        },
        discardUserState(state) {
            state = initialState();
        },
    },
});
export const { storeUserState, discardUserState } = userSlice.actions;
export default userSlice.reducer;
