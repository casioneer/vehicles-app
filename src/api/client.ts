import axios from "axios";

const api = axios.create({
  baseURL: "https://ofc-test-01.tspb.su",
  timeout: 10000,
});

export { api };
