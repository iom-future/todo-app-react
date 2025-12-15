import React from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
function App() {
  return (
    <div className='bg-gray-200 min-h-screen' >
      <Header/>
      <TodoList />
    </div>
  )
}

export default App