import React, { useState } from 'react';
import './todo-list-item-info.css';
// берутся значения из атрибутов в файле todo-list.js - они и являются пропсами
const TaskListItem = ({ task, time, status, completeFunc, changeFunc, acceptFunc, id }) => {
   let className = 'description ' + status;

   const [stateInfo, editTask] = useState({ value: '', id: id });

   const handleFormChanges = (e) => {
      editTask({ value: e.target.value, id: id });
   };
   const handleSubmitForm = (e) => {
      acceptFunc(stateInfo);
      e.preventDefault();
      editTask({ value: '', id: id });
   };

   if (status === 'editing') {
      return (
         <label className="todo-list-item-info todo-list-item-info__editing">
            <span className={className}>
               <form onSubmit={handleSubmitForm}>
                  <input type="text" onChange={handleFormChanges} value={stateInfo.value} autoFocus></input>
               </form>
            </span>
         </label>
      );
   } else {
      return (
         <label className="todo-list-item-info">
            <span className={className} onClick={() => completeFunc(status, id)} onChange={(e) => changeFunc}>
               {task}
            </span>
            <span className="created">{time}</span>
         </label>
      );
   }
};

export default TaskListItem;
