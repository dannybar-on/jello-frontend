import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export function DoughnutChart({ board }) {

    const calcTasksByLabel = () => {
        const labelIds = board.labels.map(label => label.id);
        const labelCounts = [];

        for (let i = 0; i < labelIds.length; i++) {
            labelCounts.push(0);
        }

        for (let i = 0; i < board.groups.length; i++) {
            for (let j = 0; j < board.groups[i].tasks.length; j++) {
                for (let k = 0; k < board.groups[i].tasks[j].labelIds.length; k++) {
                    if (labelIds.includes(board.groups[i].tasks[j].labelIds[k])) {
                        labelCounts[labelIds.indexOf(board.groups[i].tasks[j].labelIds[k])]++;
                    }
                }
            }
        }
        return labelCounts;
    }



    const labelsData = {
        labels: board.labels.map(label => label.title),
        datasets: [
            {
                label: '# of labels',
                data: calcTasksByLabel(),
                backgroundColor: [
                    ...board.labels.map(label => label.color),
                ],
                borderColor: [
                    ...board.labels.map(label => label.color),
                ],
                borderWidth: 3,
            },
        ],
    };
    const options = {

        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Tasks by labels",
                color: 'rgba(255, 255, 255, 0.897)',
                font: {
                    size: '30',
                    family: 'Segoe UI'
                }
            },
            legend: {
                position: 'right',
                labels: {
                    color: 'rgba(255, 255, 255, 0.897)',
                    boxWidth: 14,
                    boxHeight: 14,
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        family: 'Segoe UI'
                    }
                }
            }
        },
        maintainAspectRatio: false,

    };

    return (
        <Doughnut
            data={labelsData}
            width={350}
            height={350}
            options={options} />
    )
}