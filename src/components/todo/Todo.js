import React from 'react';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        
        let date = new Date();
        
        this.state = {
            listTasks: [],
        };

        this.addTask = this.addTask.bind(this);
        this.updateTaskContent = this.updateTaskContent.bind(this);
        this.updateTaskStatus = this.updateTaskStatus.bind(this);
        this.updateTaskType = this.updateTaskType.bind(this);
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

    updateTaskContent(taskContent, task) {
        let listTasks = this.state.listTasks;
        let currentTask = listTasks.find((item) => item.id === task.id);
        currentTask.content = taskContent;
        currentTask.status = 'edited';

        this.setState({
            listTasks,
        });
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

    render() {
        return (
            <div className="container">
                <TodoHeader listTasks={this.state.listTasks} onAddTask={this.addTask} />
                <ul className="todo-list">
                    {this.state.listTasks.map((task, index) =>
                        <TodoItem key={index} 
                                  updateTaskType={this.updateTaskType} 
                                  updateTaskStatus={this.updateTaskStatus} 
                                  updateTaskContent={this.updateTaskContent} 
                                  deleteTask={this.deleteTask} 
                                  task={task} />
                    )}
                </ul>
            </div>
        );
    }
};