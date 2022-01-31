import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import { Loader } from './Loader';
import { BsFillPeopleFill } from 'react-icons/bs';
import { setCurrBoard } from '../store/board.action';
import { IoMdClose } from 'react-icons/io';

export function _Dashboard(props) {
  const onBack = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (!props.board){
        props.setCurrBoard(board);
    }
  }, [props]);

  const { board } = props;

  const getTaskDetails = () => {
    if (!props.board) return;
    let tasks = 0;
    let overDueTasks = 0;
    let doneTasks = 0;
    let checklists = 0;
    let doneChecklists = 0;
    let todos = 0;
    let doneTodos = 0;

    if (board.groups.length) {
      board.groups.forEach((group) => {
        tasks += group.tasks.length;
        group?.tasks.forEach((task) => {
          if (task.checklists) {
            checklists += task.checklists.length;
            task.checklists.forEach((checklist) => {
              let inTodos = checklist.todos.length;
              let inDoneTodos = 0;
              todos += checklist.todos.length;
              checklist.todos.forEach((todo) => {
                if (todo.isDone) {
                  doneTodos++;
                  inDoneTodos++;
                }
              });
              if (inTodos === inDoneTodos) doneChecklists++;
            });
          }
          doneTasks += task?.status === 'complete' ? 1 : 0;
          overDueTasks +=
            task?.dueDate < Date.now() && task.status === 'over due' ? 1 : 0;
        });
      });
    }
    return {
      tasks,
      overDueTasks,
      doneTasks,
      checklists,
      doneChecklists,
      todos,
      doneTodos,
    };
  };

  const taskDetails = getTaskDetails(props);
  if (!props.board)
    return (
      <section className="dashboard-overlay flex column ">
        <Loader /> {props.history.goBack()}
      </section>
    );
  return (
    <section className="dashboard-overlay flex column fade-in">
      <button onClick={onBack} className="close-btn clean-btn">
        <IoMdClose />
      </button>
      <div className="dashboard-container flex column ">
        <div className="header flex column justify-center align-center">
          <h1 className="dash-title">{board.title}</h1>
          <p className="date">
            Created at {new Date(board.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="info-container flex align-center">
          <div className="info-box flex">
            <div className="flex column big-num-box">
              <p className="info-num">{board.members?.length}</p>
              <p className="below-num">Members</p>
            </div>
            <div className="flex column details">
              <BsFillPeopleFill className="icon" />
            </div>
          </div>
          <div className="info-box flex">
            <div className="flex column big-num-box">
              <p className="info-num">{taskDetails.tasks}</p>
              <p className="below-num">Tasks</p>
            </div>
            <div className="flex column details">
              <p className="green-task">{taskDetails.doneTasks} Completed</p>
              <p className="red-task">{taskDetails.overDueTasks} Overdue </p>
            </div>
          </div>
          <div className="info-box flex">
            <div className="flex column big-num-box">
              <p className="info-num">{taskDetails.checklists}</p>
              <p className="below-num">{`Checklist${
                taskDetails.checklists !== 1 ? 's' : ''
              }`}</p>
            </div>
            <div className="flex column details">
              <p className="green-task">
                {taskDetails.doneChecklists} Completed
              </p>
              <p className="yellow-task">{taskDetails.todos} Todos </p>
              <p className="red-task">
                {taskDetails.todos - taskDetails.doneTodos} Open todos
              </p>
            </div>
          </div>
        </div>
        <div className="chart-container flex ">
          <div className="chart flex align-center">
            <DoughnutChart board={board} />
          </div>
          <div className="chart flex align-center">
            <BarChart board={board} />
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.currBoard,
  };
}
const mapDispatchToProps = {
  setCurrBoard,
};
export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Dashboard);
