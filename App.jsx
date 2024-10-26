import { useState, useEffect } from 'react'
import {TodoProvider} from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

//USE CONSOLE LOG TO DEBUG AND TO UNDERSTAND ALSO.

function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((prev) => [{...todo}, ...prev])  
    // setTodos((prev) =>{
    //   console.log(prev)
    //   return [{...todo}, ...prev]
    // } ) 

  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo ))) //ye smajhna hai ki prevTodo me kya value hai aur prev me bhi.
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  //Local Storage accept as well as give string type data.
  
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) //localStorage.getItem("key")
    
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)) //localStorage.setItem("key", "value")
  }, [todos])
  
  //ye samajhna hai ki local storage me pehle getItem kyo liya, setItem kyo ni liya.



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="bg-[#101f35] w-full max-w-2xl mx-auto shadow-md shadow-[#3d4e6b] rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4 ">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                        
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
