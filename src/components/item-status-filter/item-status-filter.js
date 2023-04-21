import React from 'react';
import './item-status-filter.css';
const ItemStatusFilter = () => {
   return (
      <div className="btn-group item-status-filter-group">
         <button type="button" className="btn btn-info btn-all">
            All
         </button>
         <button type="button" className="btn btn-outline-second btn-active">
            Active
         </button>
         <button type="button" className="btn btn-outline-second btn-done">
            Done
         </button>
      </div>
   );
};

export default ItemStatusFilter;
