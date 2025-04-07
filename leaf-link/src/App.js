import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PlantLibrary } from './pages/PlantLibrary';
import { PlantIdentification } from './pages/PlantIdentification';
import { PlantProfile } from './pages/PlantProfile';
import { Login } from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<PlantLibrary/>}/>
          <Route path="/plant-identification" element={<PlantIdentification/>}/>
          <Route path="/plants/:userId/:plantId" element={<PlantProfile />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
