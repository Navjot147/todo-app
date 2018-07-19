import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';
import { Item } from './Item';
import { Form } from './Form';

export class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showCreateItemForm: false, taskName: '' };
    }

    drop(event) {
        event.preventDefault();
        let fromItem = event.dataTransfer.getData("fromItem");
        let fromCard = event.dataTransfer.getData("fromCard");
        let toCard = this.props.todoId;
        this.props.actionHandler('drag', { fromCard, fromItem, toCard });
    }

    allowDrop(event) {
        event.preventDefault();
    }

    callDeleteCard() {
        this.props.actionHandler('deletecard', { index: this.props.todoId });
    }

    showAddItemForm() {
        this.setState({ showCreateItemForm: !this.state.showCreateItemForm, taskName: '' });
    }

    handleChange(event) {
        this.setState({ taskName: event.target.value });
    }

    createTask(name) {
        this.props.actionHandler('createtask', { cardIndex: this.props.todoId, task: { name } });
        this.showAddItemForm();
    }

    handleTaskSubmit(type, data) {
        this.createTask(data.name);
    }

    render() {
        return (<div onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}>
            <Panel>
                <Panel.Heading>
                    <span>{this.props.todo.title}</span>

                    <button type="button" className="close mr-l20" aria-label="Close" onClick={this.callDeleteCard.bind(this)}>
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <button type="button" className="close" aria-label="Close" onClick={this.showAddItemForm.bind(this)}>
                        <Glyphicon glyph="plus" />
                    </button>

                </Panel.Heading>
                <Panel.Body>
                    {!this.state.showCreateItemForm ?
                        this.props.todo.items.map((item, index) => {
                            return <Item item={item} key={index} todoId={this.props.todoId} itemId={index} actionHandler={this.props.actionHandler}></Item>
                        }) : null
                    }

                    {this.state.showCreateItemForm ? <Form formType="task" placeholder="Enter Task Name" create={this.handleTaskSubmit.bind(this)} />
                    : null}

                </Panel.Body>
            </Panel>
        </div>)
    }
}
