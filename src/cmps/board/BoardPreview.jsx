import { Link } from 'react-router-dom';

export function BoardPreview({ board }) {
  return (
    <Link to={`/board/${board._id}`}>
      <div className="preview-screen">
        <div className="board-preview-container">
          <h4>{board.title}</h4>
        </div>
      </div>
    </Link>
  );
}
