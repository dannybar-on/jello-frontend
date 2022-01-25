import { BsCheck2Square } from 'react-icons/bs';

export function Checklists({checklists}) {
    const checklistCtx = () => {
        let todosCount = 0;
        let doneTodosCount = 0;
        checklists.forEach(checklist => {
            checklist.todos.forEach(todo => {
                todosCount++;
                if (todo.isDone) doneTodosCount++;
            })
        })
        return doneTodosCount + '/' + todosCount;
    };

    return (
        <div className='badge-preview' title='Checklist'>
            <span className='icon-sm badge-icon'><BsCheck2Square /></span>
            <span>{checklistCtx()}</span>
        </div>
    )
}

