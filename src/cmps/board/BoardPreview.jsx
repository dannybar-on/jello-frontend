import { Link } from 'react-router-dom';

export function BoardPreview({ board }) {
  return (
    <Link to={`/board/${board._id}`}>
      <div className="card-overlay"></div>
        <div className="board-preview-container">
          <h1>{board.title}</h1>
        </div>
    </Link>
  );
}
