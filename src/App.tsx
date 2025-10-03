import { useEffect, useState } from "react";
import { useVehiclesStore } from "./store/vehiclesStore.ts";
import "./App.css";
import VehicleList from "./components/VehicleList.tsx";
import VehicleForm from "./components/VehicleForm.tsx";
import MapView from "./components/MapView.tsx";

export default function App() {
  const load = useVehiclesStore((s: any) => s.load);
  const loading = useVehiclesStore((s: any) => s.loading);
  const error = useVehiclesStore((s: any) => s.error);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="app">
      <header className="header">
        <h1>Vehicles SPA — Тестовое задание</h1>
        <div>
          <button onClick={() => setShowMap((v) => !v)}>{showMap ? "Hide map" : "Show map"}</button>
        </div>
      </header>

      <main className="container">
        <section className="left">
          <VehicleForm />
          {loading && <p>Загрузка...</p>}
          {error && <p className="error">Ошибка: {error}</p>}
          <VehicleList />
        </section>

        <aside className="right">
          {showMap ? <MapView /> : <div style={{padding: 12}}>Карта скрыта</div>}
        </aside>
      </main>

      <footer className="footer">
        <small>Список загружается с https://ofc-test-01.tspb.su/test-task/vehicles</small>
      </footer>
    </div>
  );
}

