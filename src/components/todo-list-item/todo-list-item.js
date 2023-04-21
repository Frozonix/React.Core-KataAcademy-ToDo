import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import TaskListItem from '../todo-list-item-info/todo-list-item-info';
import TaskBtns from '../todo-list-item-btns/todo-list-item-btns';

const Task = ({ task, time, status, deleteFunc, completeFunc, id, display, isChecked, editFunc, acceptFunc }) => {
   // const handleComplete = (status) => {
   //    // console.log(task, status, className);
   //    console.log(taskState);
   //    if (status) {
   //       //перезапись элементов в объекте taskState
   //       taskComplete({ ...taskState, status: '' });
   //    } else {
   //       //перезапись элементов в объекте taskState
   //       taskComplete({ ...taskState, status: 'completed' });
   //    }
   // };
   console.log(display);
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
         <TaskListItem task={task} time={created} status={status} completeFunc={() => completeFunc(status, id)} acceptFunc={(obj) => acceptFunc(obj)} id={id} />
         <TaskBtns status={status} deleteFunc={() => deleteFunc(id)} id={id} editFunc={() => editFunc(id)} />
      </li>
   );
};

export default Task;
