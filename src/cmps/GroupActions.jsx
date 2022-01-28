export function GroupActions({ onToggleAdd, groupId, toggleGroupArchive }) {
    return (
        <div className="group-actions flex column">
            <button onClick={ onToggleAdd }>Add card...</button>
            <button onClick={() => toggleGroupArchive(groupId)}>Archive this list...</button>
        </div>
    )
}