import { GroupPreview } from './GroupPreview.jsx';

export function GroupList({ groups, board }) {
    return (
        <div className="group-list-container flex">
            {groups.map(group => {
                return (
                    <GroupPreview
                        key={group.id}
                        board={board}
                        group={group} />
                );
            })}
        </div>
    );
}