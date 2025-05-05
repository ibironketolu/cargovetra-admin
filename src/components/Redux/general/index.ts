import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
	toggleSideMenu: boolean;
}

const initialState: ModalState = {
	toggleSideMenu: true,
};

const modalSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setToggleSideMenu: (state) => {
			state.toggleSideMenu = !state.toggleSideMenu;
		},
	},
});

export const { setToggleSideMenu } = modalSlice.actions;
export default modalSlice.reducer;
