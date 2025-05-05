import Cookies from "js-cookie";

export const AUTH_TOKEN_KEY = "LOGIN_ACCESS";
export const signOut = () => {
	Cookies.remove(AUTH_TOKEN_KEY);
	window.location.pathname = "/login";
};
