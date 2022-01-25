

export function ProgressBar({ percentage }) {

    const bgColor = (percentage === 100) ? '#61bd4f' : '#5ba4cf';
    // percentage = (Number.isInteger(percentage)) ? percentage : percentage.toFixed(2);

    return <section className="checklist-progress flex" style={{ width: '100%' }}>
        <span className="checklist-progress-percentage">{Math.floor(percentage)}%</span>
        <div className=" checklist-progress-bar" style={{ backgroundColor: '#091e4214', width: '100%' }}>
            <div className='checklist-progress-bar-current' style={{ backgroundColor: bgColor, width: percentage + '%' }} >
            </div>
        </div>
    </section>;
}