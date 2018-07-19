import React from 'react';
export class Item extends React.Component {
    dragStartHandler(event) {
        event.dataTransfer.setData("fromItem", event.target.dataset.taskid);
        event.dataTransfer.setData("fromCard", this.props.todoId);
    }

    callDeleteTask() {
        this.props.actionHandler('deletetask', { cardId: this.props.todoId, taskId: this.props.itemId });
    }

    render() {
        return (<div draggable="true" data-taskid={this.props.itemId} onDragStart={this.dragStartHandler.bind(this)}>
            <li className="list-group-item justify-content-between">
                {this.props.item.task}

                <button type="button" className="close" aria-label="Close" onClick={this.callDeleteTask.bind(this)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        </div>)
    }
}
