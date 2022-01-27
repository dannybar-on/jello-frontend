export function GroupActions({ onToggleAdd }) {
    return (
        <div className="group-actions flex column">
            <button onClick={ onToggleAdd }>Add card...</button>
            <button>Archive this list...</button>
        </div>
    )
}