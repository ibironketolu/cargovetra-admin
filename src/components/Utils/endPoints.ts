import axios from "axios";
import { getYearRange } from "./extras";

export const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const login = async (data: any) =>
	axios.post(`${API_URL}/login`, data);

export const logout = async (data: any) =>
	axios.post(`${API_URL}/logout`, data);

export const createShipment = async (data: any) =>
	axios.post(`${API_URL}/shipments`, data);

export const updateShipment = async (id: any, data: any) =>
	axios.post(`${API_URL}/shipments/${id}`, data);

export const updateShipmentTracking = async (id: any, data: any) =>
	axios.put(`${API_URL}/shipments/tracking/${id}`, data);

export const DeleteShipment = async (data: any) =>
	axios.delete(`${API_URL}/shipments/${data}`);

export const createTracking = async (data: any) =>
	axios.post(`${API_URL}/shipments/tracking`, data);

export const getShipment = async (page: 1, perPage: 10) =>
	axios.get(`${API_URL}/shipments?page=${page}&per_page=${perPage}`);

export const getShipmentTracking = async (page: 1, perPage: 10) =>
	axios.get(`${API_URL}/shipments/tracking?per_page=${perPage}&page=${page}`);

export const DeleteShipmentTracking = async (data: any) =>
	axios.delete(`${API_URL}/shipments/tracking/${data}`);

export const getAShipment = async (data: any) =>
	axios.post(`${API_URL}/shipments/${data}`);

export const getAShipmentTracking = async (data: any) =>
	axios.get(`${API_URL}/shipments/tracking/status/${data}`);

export const getStatus = async (data: any) =>
	axios.get(`${API_URL}/stats`);