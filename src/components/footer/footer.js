import React, { useState } from 'react';

import './footer.css';
import TasksFilter from '../TasksFilter/footer-filter';

const Footer = ({ complete, clearFunc, toggleFunc }) => {
   const TaskFilterId = 0;
   const [filterId, setTaskFilter] = useState(TaskFilterId);
   console.log(filterId);
   function changeFilter(id) {
      const index = Number(id.target.id.slice(-1));
      setTaskFilter(index);
      toggleFunc(index);
      // console.log(index);
   }
   return (
      <div className="footer">
         <div className="footer__items-left">
            <span>{complete} items left</span>
         </div>
         <TasksFilter filterState={filterId} filterFunc={changeFilter} />
         <div className="footer__clear">
            <button className="footer__clear-btn" onClick={() => clearFunc()}>
               Clear completed
            </button>
         </div>
      </div>
   );
};

export default Footer;
