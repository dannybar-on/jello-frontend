import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { taskService } from '../../../services/task.service.js';
import { updateTask } from '../../../store/board.action';
import { FiPaperclip } from 'react-icons/fi';
import { uploadImg } from '../../../services/cloudinary.service.js';

function _AddAttachment({ updateTask, toggleDynamicModal }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const urlRef = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const res = taskService.handleFileAdd(url, title);
    updateTask(...res);
    toggleDynamicModal();
  };

  const handleUploadImg = async (ev) => {
    const title = ev.target.files[0].name;
    const url = await uploadImg(ev);
    const res = taskService.handleFileAdd(url, title);
    updateTask(...res);
    toggleDynamicModal();
  };

  return (
    <div className="attach-file">
      <div className="attach-from">
        <label htmlFor="upload">
          <span aria-hidden="true">Computer</span>
          <input
            type="file"
            id="upload"
            style={{ display: 'none' }}
            onChange={handleUploadImg}
          />
        </label>
      </div>
        
        <hr />
      <form onSubmit={handleSubmit} className="attach-link">
        <label className="modal-content-title">Attach a link</label>
        <input
          ref={urlRef}
          className='modal-search'
          placeholder="Paste any link here..."
          value={url}
          onChange={(ev) => setUrl(ev.target.value)}
        />
        {url && (
          <>
            <label>Link name (optional)</label>
            <input
               className='modal-search'
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </>
        )}
        <button className="attach-btn btn-style2">Attach</button>
      </form>
    </div>
  );
}

const mapStateToProps = ({ boardModule }) => {
  return {
    board: boardModule.currBoard,
    currTask: boardModule.currTask,
  };
};

const mapDispatchToProps = {
  updateTask,
};

export const AddAttachment = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddAttachment);
