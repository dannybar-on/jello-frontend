import { GroupPreview } from './GroupPreview.jsx';

export function GroupList({ groups, board, toggleEditOpen }) {
    return (
        <div className="group-list-container flex">
            {groups.map((group, index) => {
                return (
                    <GroupPreview
                        key={group.id}
                        toggleEditOpen={toggleEditOpen}
                        group={group}
                        board={board}
                        index={index} />
                );
            })}
        </div>
    );
}