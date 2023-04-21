import React, { useState } from 'react';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import './search-panel.css';

const NewTaskForm = ({ addFunc }) => {
   const [value, addNewTask] = useState('');
   const handleFormChanges = (e) => {
      e.preventDefault();
      addNewTask(e.target.value);
      // console.log(e.target.value);
   };
   const handleSubmitForm = (e) => {
      e.preventDefault();
      addNewTask('');
      addFunc(value);
   };
   return (
      <form className="search-panel-wrapper" onSubmit={handleSubmitForm}>
         <input placeholder="What needs to be done?" className="search-panel" autoFocus onChange={handleFormChanges} value={value}></input>
         <ItemStatusFilter />
      </form>
   );
};

export default NewTaskForm;
