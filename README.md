## MapComponent.js

The `MapComponent.js` file is responsible for rendering an interactive map using **React Leaflet** and dynamically loading city data from a `cities.lst` file. Here's what it does:

1. **Fetch City Data**:
   - The component uses the `fetch` API inside a `useEffect` hook to retrieve the `cities.lst` file (either from the public folder or a hosted URL).
   - The `parseCitiesLst` function parses this file, extracting city names, latitudes, longitudes, and generates a simulated UV Index for each city.
2. **Map Rendering**:
   - The map is centered on the U.S. and displayed using **Leaflet**'s `MapContainer` and `TileLayer`.
   - For each city, a `Marker` is placed on the map at the corresponding latitude and longitude.
3. **Marker Interaction**:
   - When a city marker is clicked, a `Popup` appears, displaying the city’s name and its UV Index value.

This component allows you to visually map cities and their UV Index data dynamically based on the input from the `cities.lst` file.





### Kill the Process on Port 3000

If you'd prefer to keep using port 3000, you can manually stop whatever is running on that port:

1. **Find the Process**: Run the following command to identify the process using port 3000.

   ```
   lsof -i :3000
   ```

2. **Kill the Process**: After identifying the process, kill it using its PID (e.g., `kill -9 <PID>`):

   ```
   kill -9 <PID>
   ```

3. **Start the React App Again**: Run `npm start` again to use port 3000.
