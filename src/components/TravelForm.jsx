import { useState, useEffect } from "react";
import './TravelForm.css'; 

const initialFormState = {
  name: "",
  country: "",
  city: "",
  date: "",
  image: "",
  rating: 5,
  memo: "",
};

function TravelForm({ onAdd, editingTravel, onUpdate, onCancelEdit }) {
  const [form, setForm] = useState(initialFormState);

  // 수정 모드일 때 기존 데이터로 폼 채우기
  useEffect(() => {
    if (editingTravel) {
      setForm(editingTravel);
    }
  }, [editingTravel]);

  // 모든 input 공통 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수값 검사
    if (!form.name || !form.country || !form.city || !form.date) {
      alert("필수 항목을 모두 입력해주세요!");
      return;
    }

    if (editingTravel) {
      // 수정 모드
      onUpdate({
        ...form,
        id: editingTravel.id,
      });
    } else {
      // 추가 모드
      const newTravel = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      onAdd(newTravel);
    }

    // 폼 초기화
    setForm(initialFormState);
  };

  // 수정 취소
  const handleCancel = () => {
    setForm(initialFormState);
    onCancelEdit();
  };

  return (
    <form className="travel-form" onSubmit={handleSubmit}>
      <h2>{editingTravel ? "여행지 수정" : "새 여행지 추가"}</h2>

      {/* 여행지 이름 */}
      <div className="form-group">
        <label>여행지 이름 *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="예: 에펠탑"
        />
      </div>

      {/* 국가 */}
      <div className="form-group">
        <label>국가 *</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="예: 프랑스"
        />
      </div>

      {/* 도시 */}
      <div className="form-group">
        <label>도시 *</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="예: 파리"
        />
      </div>

      {/* 날짜 */}
      <div className="form-group">
        <label>방문 날짜 *</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      {/* 이미지 URL */}
      <div className="form-group">
        <label>사진 URL</label>
        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* 평점 */}
      <div className="form-group">
        <label>평점: {form.rating}점</label>
        <input
          type="range"
          name="rating"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
        />
      </div>

      {/* 메모 */}
      <div className="form-group">
        <label>메모</label>
        <textarea
          name="memo"
          value={form.memo}
          onChange={handleChange}
          rows="4"
          placeholder="여행에 대한 메모를 작성하세요..."
        />
      </div>

      {/* 버튼 영역 */}
      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {editingTravel ? "수정하기" : "추가하기"}
        </button>

        {editingTravel && (
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}

export default TravelForm;
