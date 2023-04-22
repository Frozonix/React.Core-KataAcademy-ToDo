import React, { useState } from 'react';

import AppHeader from '../app-header/app-header';
import NewTaskForm from '../search-panel/search-panel';
import TaskList from '../todo-list/todo-list';

import './app.css';
import Footer from '../footer/footer';
let maxId = 4;
const App = () => {
   const todoData = [
      // { status: 'completed', task: 'Completed', time: new Date(2023, 3, 18, 14, 25, 20), id: 1, display: 'show' },
      // { status: 'editing', task: 'Make awesome app', time: new Date(2023, 3, 18, 10, 0, 0), id: 2, display: 'show' },
      // { status: '', task: 'Active task', time: new Date(2023, 3, 17, 12, 0, 0), id: 3, display: 'show' },
   ];

   const [data, setDataState] = useState(todoData);
   let tasksComplete = tasksCompleteFunc(data);

   function toggleTaskList(index) {
      function showTaskList() {
         return data.map((item) => {
            return { ...item, display: 'show' };
         });
      }
      switch (index) {
         case 0:
            {
               const newArray = showTaskList();
               setDataState(newArray);
            }
            break;

         case 1:
            {
               let newArray = showTaskList();
               newArray = newArray.map((item) => {
                  if (item.status === 'completed') {
                     return { ...item, display: null };
                  } else {
                     return { ...item, display: 'show' };
                  }
               });
               setDataState(newArray);
            }
            break;
         case 2:
            {
               let newArray = showTaskList();
               newArray = newArray.map((item) => {
                  if (item.status === 'completed') {
                     return { ...item, display: 'show' };
                  } else {
                     return { ...item, display: null };
                  }
               });
               setDataState(newArray);
            }
            break;
         default:
            break;
      }
   }

   function tasksCompleteFunc(arr) {
      return arr.reduce((acc, item) => (item.status === 'completed' ? acc + 1 : acc), 0);
   }

   const getIndex = (arr, id) => {
      return arr.findIndex((elem) => {
         return elem.id === id;
      });
   };

   const clearCompleted = () => {
      const newArray = [];
      data.forEach((elem) => {
         if (elem.status !== 'completed') {
            newArray.push(elem);
         }
      });
      setDataState(newArray);
   };

   const addItem = (task) => {
      const newTask = {
         status: '',
         task: task,
         time: Date.now(),
         id: maxId++,
         display: 'show',
      };
      setDataState((data) => {
         const newArray = [...data, newTask];
         return newArray;
      });
   };

   const handleComplete = (status, id) => {
      const i = getIndex(data, id);
      const newArray = data.map((item, index) => {
         if (i === index) {
            if (status) {
               return { ...item, status: '' };
            } else {
               return { ...item, status: 'completed' };
            }
         }
         return item;
      });

      tasksComplete;
      setDataState(newArray);
   };

   const handleDeleteBtn = (id) => {
      const newArray = [...data];
      const indexDelete = getIndex(newArray, id);

      newArray.splice(indexDelete, 1);
      setDataState(newArray);
   };

   const handleEditBtn = (id) => {
      let newArray = [...data];
      const indexEdit = getIndex(newArray, id);
      newArray = data.map((item, index) => {
         if (index === indexEdit && item.status !== 'completed') {
            return { ...item, status: 'editing' };
         }
         return item;
      });
      if (JSON.stringify(data) !== JSON.stringify(newArray)) {
         setDataState(newArray);
      }
   };

   const acceptChanges = (obj) => {
      let newArray = [...data];
      const indexAccept = getIndex(newArray, obj.id);
      newArray[indexAccept] = { ...newArray[indexAccept], status: '', task: obj.value };

      setDataState(newArray);
   };

   return (
      <section className="app-wrapper">
         <AppHeader />
         <div className="app-interface">
            <NewTaskForm addFunc={addItem} />
            <TaskList
               todos={data}
               deleteFunc={handleDeleteBtn}
               completeFunc={handleComplete}
               editFunc={handleEditBtn}
               acceptFunc={acceptChanges}
            />
            <Footer complete={tasksComplete} clearFunc={clearCompleted} toggleFunc={toggleTaskList} />
         </div>
      </section>
   );
};

export default App;
