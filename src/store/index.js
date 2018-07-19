
const todos = [{
    id: 'c1',
    title: "Morning",
    items: [{
        id: 1,
        task: "Do Brush"
    }, { id: 2, task: "Task Bath" }]
}, { id: 'c2', title: "Noon", items: [{ id: 3, task: "Shut the laptop" }, { id: 4, task: "Eat Lunch" }, { id: 5, task: "Do walk" }] }, { id: 'c3', title: "Evening", items: [{ id: 6, task: "Fill Daily time sheet" }, { id: 7, task: "Do call to param" }, { id: 8, task: "Goto gym" }] }];

function returnTodos() {
    if(localStorage && localStorage.getItem('todos')) {
        return JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

export default returnTodos();
