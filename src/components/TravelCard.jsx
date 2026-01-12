function TravelCard({ travel, onEdit, onDelete }) {
    const stars = '⭐'.repeat(travel.rating);

    return (
        <div className="travel-card">
            <div className="card-image">
                {travel.image ? (
                    <img src={travel.image} alt={travel.name} />
                ) : (
                    <div className="no-Image">📷</div>
                )}
            </div>

            <div className="card-content">
                <h3>{travel.name}</h3>
                <p className="location">📍 {travel.city}, {travel.country}</p>
                <p className="date">📅 {travel.date}</p>
                <p className="rating">{stars}</p>
                {travel.memo && <p className="memo">{travel.memo}</p>}
            </div>

            <div className="card-actions">
                <button className="btn-edit" onClick={() => onEdit(travel)}>
                    수정
                </button>
                <button className="btn-delete" onClick={() => onDelete(travel.id)}>
                    삭제
                </button>
            </div>
        </div>
    );
}

export default TravelCard;