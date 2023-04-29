import React from 'react'
import './footer-filter.css'

function TasksFilter({ filterState, filterFunc }) {
  return (
    <div className="footer__filter" id="footerFilter">
      <div>
        <button
          id="filter-btn-0"
          type="button"
          className={filterState === 0 ? 'selected' : ''}
          onClick={(e) => filterFunc(e)}
        >
          All
        </button>
      </div>
      <div>
        <button
          id="filter-btn-1"
          type="button"
          className={filterState === 1 ? 'selected' : ''}
          onClick={(e) => filterFunc(e)}
        >
          Active
        </button>
      </div>
      <div>
        <button
          id="filter-btn-2"
          type="button"
          className={filterState === 2 ? 'selected' : ''}
          onClick={(e) => filterFunc(e)}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

TasksFilter.defaultProps = {
  filterState: 0,
}
export default TasksFilter
