import React from 'react';
import { DropdownButton } from 'react-bootstrap';
export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', priorities: [{ id: 'p1', name: 'Highest', colorCodeClass: 'bg-danger' }, { id: 'p2', name: 'Medium', colorCodeClass: 'bg-warning' }, { id: 'p3', name: 'Low', colorCodeClass: 'bg-success' }], dropDownValue: { id: null, title: "Select Priority Label" }, taskDateTime: '' }
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    callCreateTask() {
        const { name, taskDateTime } = this.state;
        let data = { name, priorityId: this.state.dropDownValue.id, taskDateTime };
        this.props.create(this.props.formType, data);
    }

    applyLabel(index) {
        const { id, name } = this.state.priorities[index];
        this.setState({ dropDownValue: { id, title: name } });
    }

    renderPriorityDom(item, index) {
        return <ul key={index}>
            <li onClick={this.applyLabel.bind(this, index)}>{item.name}<span className={[item.colorCodeClass, "priority-badge"].join(' ')}></span></li>
        </ul>
    }

    renderDropDown() {
        return <DropdownButton
            className="Default"
            title={this.state.dropDownValue.title}
            key="123"
            id="40"
        >
            {this.state.priorities.map(this.renderPriorityDom.bind(this))}
        </DropdownButton>
    }

    render() {
        return (<div className="todo-form">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder={this.props.placeholder} aria-label={this.props.placeholder} aria-describedby="basic-addon2" value={this.state.name} onChange={this.handleChange.bind(this)} />

                {this.props.isTaskForm ? <input type="datetime-local" className="form-control" aria-describedby="basic-addon2" value={this.state.taskDateTime} onChange={(event) => {
                    this.setState({ taskDateTime: event.target.value });
                }} /> : null}

                {this.props.isTaskForm ? this.renderDropDown() : null}

                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.callCreateTask.bind(this)}>Create</button>
                </div>
            </div>
        </div>)
    }
}
