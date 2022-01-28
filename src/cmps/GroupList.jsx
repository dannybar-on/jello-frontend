import { GroupPreview } from './GroupPreview.jsx';
import { Droppable } from 'react-beautiful-dnd';

export function GroupList({ groups, board, toggleEditOpen, updateGroup,isEditOpen, toggleTaskLabelList, isTaskLabelListOpen,  onSetCurrTask, toggleGroupArchive }) {
  return (
    <Droppable droppableId={'all-groups'} type="group" direction='horizontal'>
        {provided =>(

      <div className="group-list-container flex" {...provided.droppableProps}
      ref={provided.innerRef}>
        {groups.map((group, index) => {
          return (
            <GroupPreview
              key={group.id}
              // toggleEditOpen={toggleEditOpen}
              group={group}
              board={board}
              index={index}
              onSetCurrTask={onSetCurrTask}
              updateGroup={updateGroup}
              isTaskLabelListOpen={isTaskLabelListOpen}
              toggleTaskLabelList={toggleTaskLabelList}
              toggleGroupArchive={toggleGroupArchive}
            />
          );
        })}
        {provided.placeholder}
      </div>
        )}
    </Droppable>
  );
}
