import React from 'react';
import './todo-list-item-btns.css';
// import { id } from 'date-fns/locale';

const TaskBtns = ({ status, deleteFunc, id, editFunc }) => {
   console.log(deleteFunc);
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
