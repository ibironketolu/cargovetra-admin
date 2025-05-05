"use client";
import { combineReducers } from "redux";
import general from "../../Redux/general";
import authReducer from "../../Redux/Auth";

export const rootReducer = combineReducers({
	general: general,
	auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
