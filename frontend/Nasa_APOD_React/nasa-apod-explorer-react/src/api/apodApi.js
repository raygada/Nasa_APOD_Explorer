import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = axios.create({
  baseURL: BASE_URL,
});

export const getToday = () => API.get("/today");
export const getByDate = (date) => API.get(`/date?date=${date}`);
export const getMonthly = (year, month) => API.get(`/gallery/month?year=${year}&month=${month}`);
export const getYearly = (year) => API.get(`/gallery/year?year=${year}`);
export const getFavorites = () => API.get("/favorites");
export const addFavorite = (apod) => API.post("/favorites", apod);