import React from 'react';
import './todo-list-item-btns.css';

const TaskBtns = ({ status, deleteFunc, id, editFunc }) => {
   if (status !== 'editing') {
      return (
         <div className="item-btns-group">
            <button onClick={() => editFunc(id)}></button>
            <button onClick={() => deleteFunc(id)}></button>
         </div>
      );
   }
};

export default TaskBtns;
