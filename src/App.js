import React from 'react';
import MapComponent from './MapComponent'; // Map 1 component
import Solard3map from './Solard3map'; // New map (Map 2)
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>UV Index Maps</h1>
      </header>
      <div className="map-container">
        {/* Map 1 */}
        <div id="map1" className="map">
          <MapComponent />
        </div>
        {/* Map 2 */}
        <div id="map2" className="map">
          <Solard3map /> {/* New D3 map */}
        </div>
      </div>
      <div className="other-content">
        <p>Other information or maps can be added here</p>
      </div>
    </div>
  );
}

export default App;
