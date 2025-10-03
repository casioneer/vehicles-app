# Vehicles SPA (React + TypeScript + Vite)

A single-page application to view, create, edit, delete, and sort vehicles fetched from a REST API. Includes an optional map view (Leaflet) to display vehicles by coordinates.

## Demo
- Data endpoint: `https://ofc-test-01.tspb.su/test-task/vehicles`
- Local dev: run the app and the list will auto-load from the endpoint (or local stub if axios is not installed yet).

## Features
- View vehicles: name, model, year, price
- Create vehicle: name, model, year, color, price
- Edit vehicle: name and price
- Delete vehicle
- Sort by: year, price (ascending/descending toggle)
- Map view with markers for vehicles with latitude/longitude
- Fully typed with TypeScript
- State management with Zustand
- Local persistence (localStorage) for edits/creates/deletes

## Tech Stack
- React 18 + TypeScript + Vite
- Zustand for state
- Axios (or local stub) for API client
- Leaflet + react-leaflet for map

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
# From project root
npm install
```

If you see a peer dependency conflict with react-leaflet, ensure React is at 18.x (this project uses 18.3.x). If needed, remove lockfile and node_modules and reinstall:
```bash
# PowerShell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

### Run
```bash
npm run dev
```
Open the URL printed by Vite.

## API Client
- File: `src/api/client.ts`
- By default, contains a typed stub returning sample data so the app runs even without axios installed.
- To enable real API calls, replace contents with the axios version included in the file comments and ensure `npm install` completed.

```ts
// axios version (uncomment and use after npm install)
import axios from "axios";

const api = axios.create({
  baseURL: "https://ofc-test-01.tspb.su",
  timeout: 10000,
});

export { api };
```

## State Management
- File: `src/store/vehiclesStore.ts`
- Loads from server on startup; merges with localStorage data
- Provides actions: `load`, `addVehicle`, `updateVehicle`, `deleteVehicle`, `setSort`, `getSorted`

## Components
- `VehicleForm.tsx`: create new vehicles
- `VehicleList.tsx`: list + sorting controls
- `VehicleItem.tsx`: view + inline edit/delete for name/price
- `MapView.tsx`: Leaflet map, markers for vehicles with coords
- `App.tsx`: layout, loads data, toggles map

## Styling
- Global styles in `src/index.css`
- App and components styling in `src/App.css`
- Leaflet CSS is imported directly in `MapView.tsx`

## Scripts
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

## Troubleshooting
- React/peer deps conflict:
  - Ensure React 18.x and `react-leaflet@^4`
  - Reinstall deps as shown above
- Leaflet tiles appear as squares/rectangles:
  - Ensure `import 'leaflet/dist/leaflet.css'` in `MapView.tsx`
  - App CSS sets proper sizes for `.leaflet-container`
- Module import errors with TypeScript:
  - `tsconfig.app.json` uses `verbatimModuleSyntax: true`. Imports include explicit extensions like `.tsx`/`.ts`.

## GitHub
To publish the project:
```bash
# Initialize repo
git init
git add .
git commit -m "feat: vehicles SPA with CRUD, sorting, map, TS"

# Create a new GitHub repo (replace URL)
git branch -M main
git remote add origin https://github.com/<your-username>/vehicles-app.git
git push -u origin main
```

## License
MIT
