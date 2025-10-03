export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color?: string;
  price: number;
  latitude?: number | null;
  longitude?: number | null;
}