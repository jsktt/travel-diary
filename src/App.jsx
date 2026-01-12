import { useState } from 'react';
import './App.css';
import TravelForm from './components/TravelForm';
import Header from './components/Header';



function App() {

  const [travels, setTravels] = useState([]);

  // 총 국가 수 계산
  const totalCountries = new Set(travels.map(t => t.country)).size;

  return (
    <div className="App">
        
      <h1>여행 기록</h1>
      <TravelForm/>

    <div className="App">
      <Header totalTrips={travels.length} totalCountries={totalCountries} />
    </div>
    </div>
  );
}

export default App;