import { GroupPreview } from './GroupPreview.jsx';

export function GroupList({groups}) {
    return (
        <ul className="group-list">
            {groups.map(group => {
                return (
                    <GroupPreview 
                    key={group.id}
                    group={group} />
                )
            })}
        </ul>
    )
}