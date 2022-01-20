import { GroupPreview } from './GroupPreview.jsx';

export function GroupList({ groups, board }) {
    return (
        <div className="group-list-container flex">
            {groups.map((group, index) => {
                return (
                    <GroupPreview
                        key={group.id}
                        group={group}
                        board={board}
                        index={index} />
                );
            })}
        </div>
    );
}