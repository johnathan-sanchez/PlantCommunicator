import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PlantLibrary } from './pages/PlantLibrary';
import { PlantUpload } from './pages/PlantUpload';
import { PlantIdentification } from './pages/PlantIdentification';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PlantLibrary/>}/>
          <Route path="/plant-upload" element={<PlantUpload/>}/>
          <Route path="/plant-identification" element={<PlantIdentification/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
