import React, { useEffect, useState } from 'react'

import { AppHeader } from '../app-header/app-header'
import { NewTaskForm } from '../search-panel/search-panel'
import { TaskList } from '../todo-list/todo-list'
import './app.css'
import { Footer } from '../footer/footer'

function genId() {
  const IDs = []
  return function g() {
    let generate
    for (let i = 0; i < 100; i++) {
      generate = Math.floor(Math.random() * 10000)
      const result = IDs.indexOf(generate)
      if (result === -1) {
        break
      }
    }
    IDs.push(generate)
    return generate
  }
}
const generate = genId()

function App() {
  const todoData = []
  const [data, setDataState] = useState(todoData)
  const [filteredAll, setAllFiltered] = useState(data)
  const [filteredActive, setActiveFiltered] = useState(data)
  const [filteredCompleted, setCompletedFiltered] = useState(data)

  const [filterBtn, setfilterBtn] = useState('all')

  useEffect(() => {
    if (filterBtn === 'all') {
      setDataState(filteredAll)
    } else if (filterBtn === 'active') {
      setFilter(filteredAll, 'active')
      setDataState(filteredActive)
    } else {
      setFilter(filteredAll, 'completed')
      setDataState(filteredCompleted)
    }
  }, [data, filteredAll, filteredActive, filteredCompleted, filterBtn])

  function tasksCompleteFunc(arr) {
    return arr.reduce((acc, item) => (item.status === 'completed' ? acc + 1 : acc), 0)
  }
  const tasksComplete = tasksCompleteFunc(data)

  function setFilter(d, id) {
    const newArray = d.filter((item) => item.status === id)
    if (id === 'active') {
      setActiveFiltered(newArray)
    } else {
      setCompletedFiltered(newArray)
    }
    return newArray
  }
  function toggleTaskList(id) {
    let newState
    if (id === 'all') {
      newState = [...filteredAll]
    } else if (id === 'active') {
      newState = setFilter(filteredAll, id)
    } else if (id === 'completed') {
      newState = setFilter(filteredAll, id)
    }

    setDataState(newState)
    setfilterBtn(id)
  }

  const getIndex = (arr, id) => arr.findIndex((elem) => elem.id === id)

  const clearCompleted = () => {
    const newArray = []
    filteredAll.forEach((elem) => {
      if (elem.status !== 'completed') {
        newArray.push(elem)
      }
    })
    setAllFiltered(newArray)
    //  setDataState(newArray)
  }

  function timerUpdateState(id) {
    /* eslint-disable */
    let item
    let index

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item = data[i]
        index = i
      }
    }

    if (item.timer > 0) {
      item.timer = item.timer - 1000
      const newArray = [...data]
      newArray[index] = item
      setDataState(newArray)
    }
    /* eslint-enable */
  }

  const timerGo = (id) => {
    let item
    let index

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item = data[i]
        index = i
      }
    }
    item.isCounting = true
    const newArray = [...data]
    newArray[index] = item
    setDataState(newArray)
  }
  const timerStop = (id) => {
    let item
    let index

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item = data[i]
        index = i
      }
    }
    item.isCounting = false
    const newArray = [...data]
    newArray[index] = item
    setDataState(newArray)
  }

  const addItem = (task, min = 0, sec = 0) => {
    let timer = (min * 60 + sec) * 1000
    if (Number.isNaN(min) || Number.isNaN(sec)) {
      timer = 0
    }
    if (task && task.trim() !== 'active') {
      const newTask = {
        status: 'active',
        task,
        time: Date.now(),
        timer,
        isCounting: true,
        id: generate(data),
        //   display: 'show',
      }
      setDataState((d) => {
        const newArray = [...d, newTask]
        return newArray
      })
      setAllFiltered((d) => {
        const newArray = [...d, newTask]
        return newArray
      })
      // setInterval(downTimer.bind(this, newTask.id), 1000)
    }
  }

  const handleComplete = (status, id) => {
    const i = getIndex(filteredAll, id)
    const newArray = filteredAll.map((item, index) => {
      if (i === index) {
        if (status === 'completed') {
          return { ...item, status: 'active' }
        }
        return { ...item, status: 'completed' }
      }
      return item
    })
    setAllFiltered(newArray)
    //  setDataState(newArray)
  }

  const handleDeleteBtn = (id) => {
    const newArray = [...filteredAll]
    const indexDelete = getIndex(newArray, id)

    newArray.splice(indexDelete, 1)
    setAllFiltered(newArray)
    //  setDataState(newArray)
  }

  const handleEditBtn = (id) => {
    let newArray = [...filteredAll]
    const indexEdit = getIndex(newArray, id)
    newArray = filteredAll.map((item, index) => {
      if (index === indexEdit && item.status !== 'completed') {
        return { ...item, status: 'editing' }
      }
      return item
    })
    if (JSON.stringify(filteredAll) !== JSON.stringify(newArray)) {
      setAllFiltered(newArray)
      // setDataState(newArray)
    }
  }

  const acceptChanges = (obj) => {
    const newArray = [...filteredAll]

    const indexAccept = getIndex(newArray, obj.id)
    newArray[indexAccept] = {
      ...newArray[indexAccept],
      status: 'active',
      task: obj.value,
    }
    setAllFiltered(newArray)
    //  setDataState(newArray)
  }

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
          timerUpdateFunc={timerUpdateState}
          timerGo={timerGo}
          timerStop={timerStop}
        />
        <Footer complete={tasksComplete} clearFunc={clearCompleted} toggleFunc={toggleTaskList} />
      </div>
    </section>
  )
}

export default App
