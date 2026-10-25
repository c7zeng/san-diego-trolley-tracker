# San Diego Trolley Tracker

This is a project includes an interactive Leaflet/OpenStreetMap station map, Blue/Green/Orange sample corridors, graph-based route estimates, arrival-deadline planning, a basic offline question fallback, and an Hugging Face AI server.

## Run locally

Node.js 18+ recommended:

```bash
npm start
```

Open http://localhost:3000. The site works without an API token; AI questions then fall back to basic station-name matching.

## GitHub / hosting

Create a repository and upload the **contents** of this folder. For a static demo, enable **Settings → Pages → Deploy from a branch**, choose `main` and `/ (root)`. GitHub Pages serves the map, trip planner and local assistant fallback, **but cannot run the `/api/chat` backend**. To enable AI for a public website, deploy `server/index.js` on a Node-compatible host with `HF_TOKEN` configured as a server-side secret; point your domain to that host. Do not put tokens in GitHub Pages.

## Tests

```bash
npm test
```

## File structure

- `index.html`, `css/styles.css` — responsive interface
- `data/stops.js` — sample stations, coordinates and line edges
- `js/planner.js` — graph routing and leave-time calculations
- `js/app.js` — UI, map, and AI fallback
- `server/index.js` — optional secure AI proxy + static hosting
- `tests/planner.test.js` — Node tests

## Data roadmap

To add real arrival estimates and 98 bus routes, obtain the current MTS GTFS static feed (and an authorized real-time source if available), parse `stops.txt`, `routes.txt`, `trips.txt`, `stop_times.txt`, `calendar.txt`, and update the routing algorithm for schedule-specific departures and transfers. Do not present timetable interpolation as live vehicle positions.

Independent student project; not affiliated with MTS. Map tiles © OpenStreetMap contributors.
