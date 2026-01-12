import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';


function App() {

  const [travels, setTravels] = useState(() => {
    const saved = localStorage.getItem(`travels`);
    if (saved) {
      return JSON.parse(saved);
    }
    // localstorage 비어 있으면 빈 배열
    return [];
  });

  const [editingTravel, setEditingTravel] = useState(null);

  // travel 변경될때마다 localstorage에 저장
  useEffect(() => {
    localStorage.setItem('travel', JSON.stringify(travels))
  }, [travels])

  // 여행지 추가
  const handleAdd = (newTravel) => {
    setTravels([...travels, newTravel]);
  };

  // 여행지 수정
  const handleUpdate = (updatedTravel) => {
    setTravels(travels.map(t => t.id === updatedTravel.id ? updatedTravel : t));
    setEditingTravel(null);
  }

  // 여행지 삭제
  const handleDelete = (id) => {
    if (window.confirm(`정말 삭제할거에요?`)) {
      setTravels(travels.filter(t => t.id !== id));
    }
  };

  // 수정 시작
  const handleEdit = (travel) => {
    setEditingTravel(travel);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingTravel(null);
  };

  // 총 국가 수 계산
  const totalCountries = new Set(travels.map(t => t.country)).size;

  return (
    <div className="App">
      <Header
        totalTrips={travels.length}
        totalCountries={totalCountries} />
    </div>
  );
}
export default App;