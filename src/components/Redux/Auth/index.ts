import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserModel {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: 'customer' | 'admin' | 'user'; // Adjust as needed
	created_at: string; // ISO date string
	updated_at: string; // ISO date string
}

interface ProfileModel {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: 'customer' | 'admin' | 'user'; // Adjust as needed
	created_at: string; // ISO date string
	updated_at: string; // ISO date string
}

interface AuthState {
	token: string;
	user: UserModel | null;
	profile: ProfileModel | null;
}

const initialState: AuthState = {
	token: "",
	user: null,
	profile: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuth: () => {
			return initialState;
		},
		authLogin: (
			state,
			action: PayloadAction<{ token: string; user: UserModel }>,
		) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		updateProfile: (
			state,
			action: PayloadAction<{ profile: ProfileModel }>,
		) => {
			state.profile = action.payload.profile;
		},
		authLogout: () => {
			return initialState;
		},
	},
});

export const { resetAuth, authLogin, updateProfile, authLogout } =
	authSlice.actions;
export default authSlice.reducer;
