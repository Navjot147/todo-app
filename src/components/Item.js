import React from 'react';
import { NotificationBuilder } from '../googlenotification';
export class Item extends React.Component {
    dragStartHandler(event) {
        event.dataTransfer.setData("fromItem", event.target.dataset.taskid);
        event.dataTransfer.setData("fromCard", this.props.todoId);
    }

    callDeleteTask() {
        this.props.actionHandler('deletetask', { cardId: this.props.todoId, taskId: this.props.itemId });
    }

    convertToRealTime(type, taskDateTime) {
        switch (type) {
            case 'days':
                var oneDay = 24 * 60 * 60 * 1000;
                var diffDays = Math.round((new Date(taskDateTime).getTime() - new Date().getTime()) / (oneDay));
                if (diffDays > 0) {
                    diffDays = Math.abs(diffDays);
                    return `${diffDays} Days Remaining`;
                }
                return this.convertToRealTime('hours', taskDateTime);
            case 'hours':
                let hours = Math.round(new Date(taskDateTime).getTime() - new Date().getTime()) / 36e5;
                if (Math.round(hours) > 0) {
                    hours = Math.round(hours);
                    return `${hours} Hours Remaining`;
                }
                return this.convertToRealTime('minutes', taskDateTime);
            case 'minutes':
                let diffMs = (new Date(taskDateTime) - new Date());
                let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                return diffMins > 0 ? `${diffMins} Minutes Remaining` : this.convertToRealTime('seconds', taskDateTime);
            case 'seconds':
                let sec = Math.round((new Date(taskDateTime) - new Date().getTime()) / 1000)
                return sec > 0 ? `${sec} Seconds Remaining` : "Times Up !!";
            default:
                break;
        }
    }

    triggerReminder() {
        const notificationData = {
            title: 'Reminder',
            body: `${this.props.item.task}`,
            logoUrl: ''
        }
        const notification = NotificationBuilder.createNotofication(notificationData);
        notification.onclick = function () {
            this.close();
        }
    }

    componentDidMount() {
        if (new Date(this.props.item.dateTime).getTime() - new Date().getTime() > 0) {
            setTimeout(this.triggerReminder.bind(this), new Date(this.props.item.dateTime).getTime() - new Date().getTime());
        }
    }

    render() {
        return (<div draggable="true" data-taskid={this.props.itemId} onDragStart={this.dragStartHandler.bind(this)}>
            <li className="list-group-item flex-container-between">

                <div className="flex-container-around">
                    <span>{this.props.item.task}</span>
                    <span>{this.convertToRealTime.call(this, 'days', this.props.item.dateTime)}</span>
                </div>

                <div>
                    <button type="button" className="close" aria-label="Close" onClick={this.callDeleteTask.bind(this)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <span className={[this.props.item.priority, "priority-badge"].join(' ')}></span>
                </div>

            </li>
        </div>)
    }
}
