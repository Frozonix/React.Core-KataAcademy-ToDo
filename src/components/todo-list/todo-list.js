import React from 'react';
import Task from '../todo-list-item/todo-list-item';
import TaskListItem from '../todo-list-item-info/todo-list-item-info';
import TaskBtns from '../todo-list-item-btns/todo-list-item-btns';
import './todo-list.css';
const TaskList = ({ todos, deleteFunc, completeFunc, editFunc, acceptFunc }) => {
   console.log(todos);
   // const [isChecked, setChecked] = useState(false);
   const elements = todos.map((item) => {
      const { id = id } = item;
      return (
         <Task
            key={id}
            task={item.task}
            time={item.time}
            status={item.status}
            deleteFunc={() => deleteFunc(id)}
            completeFunc={() => completeFunc(item.status, item.id)}
            id={id}
            display={item.display}
            isChecked={item.status === 'completed' ? true : false}
            editFunc={() => editFunc(id)}
            acceptFunc={(obj) => acceptFunc(obj)}
         />
         // <li key={id} className="list-group-item">
         //    {checkVisibility}
         //    <TaskListItem task={item.task} time={item.time} state={item.state} />
         //    <TaskBtns state={item.state} />
         // </li>
      );
   });

   return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
