
// const todos = [{
//     id: 'c1',
//     title: "Morning",
//     items: [{
//         id: 1,
//         task: "Do Brush", priority: "bg-danger", dateTime: ''
//     }, { id: 2, task: "Task Bath", priority: "bg-warning", dateTime: '' }]
// }, { id: 'c2', title: "Noon", items: [{ id: 3, task: "Shut the laptop", priority: "bg-success", dateTime: '' }, { id: 4, task: "Eat Lunch", priority: "bg-warning", dateTime: '' }, { id: 5, task: "Do walk", priority: "bg-warning", dateTime: '' }] }, { id: 'c3', title: "Evening", items: [{ id: 6, task: "Fill Daily time sheet", priority: "bg-danger", dateTime: '' }, { id: 7, task: "Do call to param", priority: "bg-warning", dateTime: '' }, { id: 8, task: "Goto gym", priority: "bg-success", dateTime: '' }] }];

const todos = [];

function returnTodos() {
    if (localStorage && localStorage.getItem('todos') && localStorage.getItem('todos').length) {
        return JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function getPriorityColorCodes() {
    return { 'p1': 'bg-danger', 'p2': 'bg-warning', 'p3': 'bg-success' };
}

export let GetTodos = returnTodos;

export let PriorityColorCodes = getPriorityColorCodes;
