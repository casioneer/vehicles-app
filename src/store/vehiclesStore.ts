import { create } from "zustand";
import type { Vehicle } from "../types.ts";
import { fetchVehicles } from "../api/vehiclesApi.ts";

type SortKey = "year" | "price" | null;
type SortOrder = "asc" | "desc";

type VehiclesState = {
  vehicles: Vehicle[];
  loading: boolean;
  error?: string | null;
  sortKey: SortKey;
  sortOrder: SortOrder;
  load: () => Promise<void>;
  addVehicle: (v: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: number, patch: Partial<Vehicle>) => void;
  deleteVehicle: (id: number) => void;
  setSort: (key: SortKey, order?: SortOrder) => void;
  getSorted: () => Vehicle[];
};

const LS_KEY = "vehicles_app_data_v1";

const readFromLs = (): Vehicle[] | null => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Vehicle[];
  } catch {
    return null;
  }
};

const saveToLs = (arr: Vehicle[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
  } catch {}
};

export const useVehiclesStore = create<VehiclesState>((set: any, get: any) => ({
  vehicles: readFromLs() ?? [],
  loading: false,
  error: null,
  sortKey: null,
  sortOrder: "asc",
  load: async () => {
    set({ loading: true, error: null });
    try {
      const serverList = await fetchVehicles();
      // Merge: prefer local modifications if present in LS
      const ls = readFromLs();
      const merged = ls && ls.length ? ls : serverList;
      set({ vehicles: merged, loading: false });
      saveToLs(merged);
    } catch (err: any) {
      set({ loading: false, error: err?.message ?? "Failed to load" });
    }
  },
  addVehicle: (v: Omit<Vehicle, "id">) => {
    const list = get().vehicles;
    const maxId = list.length ? Math.max(...list.map((x: Vehicle) => x.id)) : 0;
    const newV: Vehicle = { id: maxId + 1, ...v };
    const newList = [newV, ...list];
    set({ vehicles: newList });
    saveToLs(newList);
  },
  updateVehicle: (id: number, patch: Partial<Vehicle>) => {
    const newList = get().vehicles.map((v: Vehicle) => (v.id === id ? { ...v, ...patch } : v));
    set({ vehicles: newList });
    saveToLs(newList);
  },
  deleteVehicle: (id: number) => {
    const newList = get().vehicles.filter((v: Vehicle) => v.id !== id);
    set({ vehicles: newList });
    saveToLs(newList);
  },
  setSort: (key: SortKey, order: SortOrder = "asc") => {
    set({ sortKey: key, sortOrder: order });
  },
  getSorted: () => {
    const { vehicles, sortKey, sortOrder } = get();
    if (!sortKey) return vehicles;
    const sorted = [...vehicles].sort((a, b) => {
      const av = (a as any)[sortKey] ?? 0;
      const bv = (b as any)[sortKey] ?? 0;
      return av < bv ? -1 : av > bv ? 1 : 0;
    });
    if (sortOrder === "desc") sorted.reverse();
    return sorted;
  },
}));
