import React, { useState } from 'react';
import propTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import TaskListItem from '../todo-list-item-info/todo-list-item-info';
import TaskBtns from '../todo-list-item-btns/todo-list-item-btns';

const Task = ({ task, time, status, deleteFunc, completeFunc, id, display, isChecked, editFunc, acceptFunc }) => {
   const created = 'created ' + formatDistanceToNow(time, { addSuffix: true, includeSeconds: true });
   const checkVisibility = {
      display: status === 'editing' ? 'none' : 'flex',
   };
   const className = display ? 'list-group-item' : 'list-group-item hide';

   return (
      <li className={className}>
         <label className="todo-list-item__toggle" style={checkVisibility}>
            <input type="checkbox" className="toggle" checked={isChecked} readOnly></input>
            <div className="toggle-checked">
               <p>&#x2713;</p>
            </div>
         </label>
         <TaskListItem
            task={task}
            time={created}
            status={status}
            completeFunc={() => completeFunc(status, id)}
            acceptFunc={(obj) => acceptFunc(obj)}
            id={id}
         />
         <TaskBtns status={status} deleteFunc={() => deleteFunc(id)} id={id} editFunc={() => editFunc(id)} />
      </li>
   );
};
Task.defaultProps = {
   task: 'Возникла неопознанная ошибка',
   time: null,
   status: '',
   id: 1,
   display: 'show',
   isChecked: false,
};
Task.propTypes = {
   task: propTypes.string.isRequired,
   time: propTypes.number.isRequired,
   status: propTypes.string.isRequired,
   deleteFunc: propTypes.func.isRequired,
   completeFunc: propTypes.func.isRequired,
   id: propTypes.number.isRequired,
   display: propTypes.oneOfType([propTypes.string.isRequired, propTypes.oneOf([null])]),
   isChecked: propTypes.bool.isRequired,
   editFunc: propTypes.func.isRequired,
   acceptFunc: propTypes.func.isRequired,
};
export default Task;
