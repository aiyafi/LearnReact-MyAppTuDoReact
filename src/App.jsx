import { useState } from 'react'

import './App.css'
import ToDo from './components/app/ToDo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToDo/>
    </>
  )
}

export default App
