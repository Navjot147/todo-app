import React from 'react';
export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '' }
    }

    handleChange(event){
        this.setState({ name: event.target.value });
    }

    callCreateTask() {
        let data = { name: this.state.name };
        this.props.create(this.props.formType, data);
    }

    render() {
        return (<div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder={this.props.placeholder} aria-label={this.props.placeholder} aria-describedby="basic-addon2" value={this.state.name} onChange={this.handleChange.bind(this)} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.callCreateTask.bind(this)}>Create</button>
                </div>
            </div>
        </div>)
    }
}
