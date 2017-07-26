import React from 'react';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        
        let date = new Date();
        
        this.state = {
            tdDate: {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            },

            listTasks: [],
        };

        this.addTask = this.addTask.bind(this);
        this.updateTaskContent = this.updateTaskContent.bind(this);
        this.updateTaskStatus = this.updateTaskStatus.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    addTask() {
        let listTasks = this.state.listTasks;
        let maxId = Math.max.apply(Math, listTasks.map((task) => task.id));
        maxId = Number.isFinite(maxId) ? maxId : 0;
        
        listTasks.unshift({
            id: maxId + 1,
            content: '',
            type: 'normal',
            status: 'editting',
        });
        
        this.setState({
            listTasks,
        });
    }

    updateTaskContent(event, task) {
        if (event.key === 'Enter') {
            let listTasks = this.state.listTasks;
            let currentTask = listTasks.find((item) => item.id === task.id);
            currentTask.content = event.target.value;
            currentTask.status = 'edited';

            this.setState({
                listTasks,
            });
        }
    }

    updateTaskStatus(task, status) {
        let listTasks = this.state.listTasks;
        let currentTask = listTasks.find((item) => item.id === task.id);
        currentTask.status = status;

        this.setState({
            listTasks,
        });
    }

    updateTaskType(task, type) {
        let listTasks = this.state.listTasks;
        let currentTask = listTasks.find((item) => item.id === task.id);
        currentTask.type = type;

        this.setState({
            listTasks,
        });
    }

    deleteTask(task) {
        let listTasks = this.state.listTasks;
        let indexTask = listTasks.indexOf(task);
        
        if (indexTask > -1) {
            listTasks.splice(indexTask, 1);
        }

        this.setState({
            listTasks,
        });
    }

    showActionPopup(event) {
        let target = event.currentTarget;
        let popup = target.querySelector(".action-popup");
        
        if (popup.classList.contains("show")) {
            popup.classList.remove("show");
        } else {
            popup.classList.add("show");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="todo-header">
                    {this.state.tdDate.day}- {this.state.tdDate.month} - {this.state.tdDate.year}
                </div>
                <div className="todo-summary">
                    <p>(0) done / (0) tasks</p>
                    <button onClick={this.addTask}>Add Task</button>
                </div>
                <ul className="todo-list">
                    {this.state.listTasks.map((task, index) =>
                        <li key={index} className={'todo-item ' + (task.status === 'done' ? 'task-done' : '')}>
                            <span className={'label ' + task.type} onClick={this.showActionPopup}>
                                <ul className="action-popup">
                                    <li className="important" onClick={() => this.updateTaskType(task, 'important')}>Important</li>
                                    <li className="normal" onClick={() => this.updateTaskType(task, 'normal')}>Normal</li>
                                    <li className="other" onClick={() => this.updateTaskType(task, 'other')}>Whatever</li>
                                </ul>
                            </span>

                            {task.status !== 'editting' ? (
                                <p className="text">{task.content}</p>
                            ) : (
                                <p className="text">
                                    <input type="text" defaultValue={task.content} placeholder="Type a new task and hit enter" onKeyPress={(e) => this.updateTaskContent(e, task)} />
                                </p>
                            )}
                            
                            <div className="todo-action" onClick={this.showActionPopup}>
                                 <span className="more">
                                   <span></span><span></span><span></span>
                                 </span>

                                <ul className="action-popup">
                                    {task.status !== 'done' ? (
                                        <li onClick={() => this.updateTaskStatus(task, 'done')}>Mark done</li>
                                    ) : (
                                        <li onClick={() => this.updateTaskStatus(task, 'edited')}>Mark not done</li>
                                    )}
                                    {task.status !== 'editting' && task.status !== 'done' &&
                                        <li onClick={() => this.updateTaskStatus(task, 'editting')}>Edit</li>
                                    }
                                    <li onClick={() => this.deleteTask(task)}>Delete</li>
                                </ul>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
};