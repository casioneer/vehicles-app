import { useState } from "react";
import type { FormEvent } from "react";
import { useVehiclesStore } from "../store/vehiclesStore.ts";

export default function VehicleForm() {
  const addVehicle = useVehiclesStore((s: any) => s.addVehicle);

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !model || !year || !price) {
      alert("Заполните name, model, year, price");
      return;
    }
    addVehicle({
      name,
      model,
      year: Number(year),
      color,
      price: Number(price),
      latitude: null,
      longitude: null,
    });
    setName(""); setModel(""); setYear(""); setColor(""); setPrice("");
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>Добавить машину</h3>
      <div className="row">
        <label>Название<input value={name} onChange={e=>setName(e.target.value)} /></label>
        <label>Модель<input value={model} onChange={e=>setModel(e.target.value)} /></label>
      </div>
      <div className="row">
        <label>Год<input type="number" value={year} onChange={e=>setYear(e.target.value ? Number(e.target.value) : "")} /></label>
        <label>Цена<input type="number" value={price} onChange={e=>setPrice(e.target.value ? Number(e.target.value) : "")} /></label>
      </div>
      <div className="row">
        <label>Цвет<input value={color} onChange={e=>setColor(e.target.value)} /></label>
      </div>
      <div className="actions">
        <button type="submit">Создать</button>
      </div>
    </form>
  );
}
