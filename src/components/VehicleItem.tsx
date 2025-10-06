import { useEffect, useState } from "react";
import type { Vehicle } from "../types.ts";
import { useVehiclesStore } from "../store/vehiclesStore.ts";

export default function VehicleItem({ v }: { v: Vehicle }) {
  const deleteVehicle = useVehiclesStore((s: any) => s.deleteVehicle);
  const updateVehicle = useVehiclesStore((s: any) => s.updateVehicle);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(v.name);
  const [price, setPrice] = useState<number>(v.price);

  // keep form fields in sync when store updates the item
  useEffect(() => {
    setName(v.name);
    setPrice(v.price);
  }, [v.name, v.price]);

  const save = () => {
    updateVehicle(v.id, { name, price });
    setEditing(false);
  };

  return (
    <li className="vehicle-item card">
      <div className="main">
        {!editing ? (
          <>
            <div><strong>{v.name}</strong> {v.model}</div>
            <div>Год: {v.year} — Цена: ${v.price}</div>
            <div>Цвет: {v.color ?? "—"}</div>
            <div>Коорд.: {v.latitude ?? "—"}, {v.longitude ?? "—"}</div>
          </>
        ) : (
          <div className="edit-form">
            <input value={name} onChange={e => setName(e.target.value)} />
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
          </div>
        )}
      </div>

      <div className="actions">
        {!editing ? (
          <>
            <button onClick={() => setEditing(true)}>Редактировать (name/price)</button>
            <button onClick={() => deleteVehicle(v.id)}>Удалить</button>
          </>
        ) : (
          <>
            <button onClick={save}>Сохранить</button>
            <button onClick={() => { setEditing(false); setName(v.name); setPrice(v.price); }}>Отмена</button>
          </>
        )}
      </div>
    </li>
  );
}
