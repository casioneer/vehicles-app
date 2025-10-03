import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useVehiclesStore } from "../store/vehiclesStore.ts";
import { useEffect, useRef } from "react";
import L from "leaflet";

// Импорт CSS для Leaflet
import "leaflet/dist/leaflet.css";

// Fix default icon (Leaflet + Vite)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const vehicles = useVehiclesStore((s: any) => s.vehicles);
  const mapRef = useRef<L.Map>(null);

  // default center (Moscow if none)
  const center: [number, number] = [55.753332, 37.621676];

  const markers = vehicles.filter((v: any) => v.latitude != null && v.longitude != null);

  // Исправляем размер карты после загрузки
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="map-card card">
      <h3>Карта с машинами</h3>
      <MapContainer 
        center={center} 
        zoom={5} 
        style={{ height: 500, width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((v: any) => (
          <Marker key={v.id} position={[v.latitude as number, v.longitude as number]}>
            <Popup>
              <div><strong>{v.name} {v.model}</strong></div>
              <div>Год: {v.year}</div>
              <div>Цена: ${v.price}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
