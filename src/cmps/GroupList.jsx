import { GroupPreview } from './GroupPreview.jsx';

export function GroupList({ groups }) {
    return (
        <div className="group-list-container flex">
            {groups.map(group => {
                return (
                    <GroupPreview
                        key={group.id}
                        group={group} />
                );
            })}
        </div>
    );
}