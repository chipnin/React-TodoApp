import React from 'react';

export default class TodoHeader extends React.Component {
    constructor(props) {
        super(props);
        
        let date = new Date();
        
        this.state = {
            tdDate: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            },
            
            totalDoneTask: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        let totalDoneTask = 0;
        
        nextProps.listTasks.forEach((task) => {
            if (task.status === 'done') {
                totalDoneTask += 1;
            }
        });
        
        this.setState({
            totalDoneTask,
        });
    }

    render() {
        return (
            <div>
                <div className="todo-header">
                    {this.state.tdDate.day}- {this.state.tdDate.month} - {this.state.tdDate.year}
                </div>
                <div className="todo-summary">
                    <p>({this.state.totalDoneTask}) done / ({this.props.listTasks.length}) tasks</p>
                    <button onClick={this.props.onAddTask}>Add Task</button>
                </div>
            </div>
        );
    }
};