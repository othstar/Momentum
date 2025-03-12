import axios from "axios";

const baseUrl = "https://momentum.redberryinternship.ge/api";

const getData = axios.create({
  baseURL: baseUrl,
  timeout: 10 * 1000,
  timeoutErrorMessage: "request timed out",
});

getData.interceptors.request.use((req) => {
  req.headers["Content-Type"] = "application/json";
  req.headers["Accept"] = "application/json";

  const token = import.meta.env.VITE_API_TOKEN;
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default getData;
