import { MdOutlineCheckBox } from 'react-icons/md';

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
        <div className='checklist flex align-center'>
            <span className='flex align-center'><MdOutlineCheckBox /></span>
            <span>{checklistCtx()}</span>
        </div>
    )
}