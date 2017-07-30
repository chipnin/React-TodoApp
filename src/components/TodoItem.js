import React from 'react';

export default class TodoItem extends React.Component {
    showActionPopup(event) {
        event.stopPropagation();
        
        let target = event.currentTarget;
        let popup = target.querySelector(".action-popup");
        
        if (popup.classList.contains("show")) {
            popup.classList.remove("show");
        } else {
            popup.classList.add("show");
        }
    }

    render() {
        let task = this.props.task;
        
        return (
            <li className={'todo-item ' + (task.status === 'done' ? 'task-done' : '')}>
                <span className={'label ' + task.type} onClick={this.showActionPopup}>
                    <ul className="action-popup">
                        <li className="important" onClick={() => this.props.updateTaskType(task, 'important')}>Important</li>
                        <li className="normal" onClick={() => this.props.updateTaskType(task, 'normal')}>Normal</li>
                        <li className="other" onClick={() => this.props.updateTaskType(task, 'other')}>Whatever</li>
                    </ul>
                </span>

                {task.status !== 'editting' ? (
                    <p className="text">{task.content}</p>
                ) : (
                    <p className="text">
                        <input type="text" defaultValue={task.content} placeholder="Type a new task and hit enter" onKeyPress={(e) => this.props.updateTaskContent(e, task)} />
                    </p>
                )}
                
                <div className="todo-action" onClick={this.showActionPopup}>
                     <span className="more">
                       <span></span><span></span><span></span>
                     </span>

                    <ul className="action-popup">
                        {task.status !== 'done' ? (
                            <li onClick={() => this.props.updateTaskStatus(task, 'done')}>Mark done</li>
                        ) : (
                            <li onClick={() => this.props.updateTaskStatus(task, 'edited')}>Mark not done</li>
                        )}
                        {task.status !== 'editting' && task.status !== 'done' &&
                            <li onClick={() => this.props.updateTaskStatus(task, 'editting')}>Edit</li>
                        }
                        <li onClick={() => this.props.deleteTask(task)}>Delete</li>
                    </ul>
                </div>
            </li>
        );
    }
};