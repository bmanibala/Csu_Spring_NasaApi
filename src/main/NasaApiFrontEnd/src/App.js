import React, { useState } from 'react';
import './App.scss';
import AppRoutes from './Routes';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div>

      <AppRoutes/>

      </div>

    </>
  )
}
 
export default App