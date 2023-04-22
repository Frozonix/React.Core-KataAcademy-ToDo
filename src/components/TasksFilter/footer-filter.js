import React from 'react';
import './footer-filter.css';

const TasksFilter = ({ filterState, filterFunc }) => {
   return (
      <div className="footer__filter">
         <div>
            <button id="filter-btn-0" className={filterState === 0 ? 'selected' : ''} onClick={(e) => filterFunc(e)}>
               All
            </button>
         </div>
         <div>
            <button id="filter-btn-1" className={filterState === 1 ? 'selected' : ''} onClick={(e) => filterFunc(e)}>
               Active
            </button>
         </div>
         <div>
            <button id="filter-btn-2" className={filterState === 2 ? 'selected' : ''} onClick={(e) => filterFunc(e)}>
               Completed
            </button>
         </div>
      </div>
   );
};

TasksFilter.defaultProps = {
   filterState: 0,
};
export default TasksFilter;
