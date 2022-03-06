export function activityTxt(activity) {
    switch (activity.type) {
        case 'ADD_GROUP':
            return `List added: ${activity.data}`;
        case 'CHANGE_COLOR':
            return `Color changed to: ${activity.data}`;
    }
}