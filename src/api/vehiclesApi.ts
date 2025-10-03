import { api } from "./client.ts";
import type { Vehicle } from "../types.ts";

export async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await api.get<Vehicle[]>("/test-task/vehicles");
  return res.data;
}