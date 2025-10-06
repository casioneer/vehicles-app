import { useState } from "react";
import { useVehiclesStore } from "../store/vehiclesStore.ts";
import VehicleItem from "./VehicleItem.tsx";

export default function VehicleList() {
  const items = useVehiclesStore((s: any) => s.getSorted());
  const setSort = useVehiclesStore((s: any) => s.setSort);
  const [sortKey, setSortKey] = useState<"year" | "price" | "">("");

  const changeSort = (key: "year" | "price" | "") => {
    if (!key) {
      setSortKey("");
      setSort(null);
      return;
    }
    const order = sortKey === key ? "desc" : "asc";
    setSort(key, order);
    setSortKey(key);
  };

  return (
    <div className="card list">
      <div className="list-header">
        <h3>Список машин ({items.length})</h3>
        <div>
          <button onClick={() => changeSort("year")}>Сортировать по году</button>
          <button onClick={() => changeSort("price")}>Сортировать по цене</button>
          <button onClick={() => changeSort("")}>Сброс</button>
        </div>
      </div>
      <div className="list-scroll">
        <ul>
          {items.map((v: any) => (
            <VehicleItem key={v.id} v={v} />
          ))}
        </ul>
      </div>
    </div>
  );
}
