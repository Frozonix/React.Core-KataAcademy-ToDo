import React, { useState } from 'react'

import './footer.css'
import TasksFilter from '../TasksFilter/footer-filter'

function Footer({ complete, clearFunc, toggleFunc }) {
  const TaskFilterId = 0
  const [filterId, setTaskFilter] = useState(TaskFilterId)

  function changeFilter(id) {
    const index = Number(id.target.id.slice(-1))
    setTaskFilter(index)
    toggleFunc(index)
  }
  return (
    <div className="footer">
      <div className="footer__items-left">
        <span>{complete} items left</span>
      </div>
      <TasksFilter filterState={filterId} filterFunc={changeFilter} />
      <div className="footer__clear">
        <button type="button" className="footer__clear-btn" onClick={() => clearFunc()}>
          Clear completed
        </button>
      </div>
    </div>
  )
}

Footer.defaultProps = {
  complete: 0,
}
export default Footer
