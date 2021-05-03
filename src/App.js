import React from 'react'
import Home from "./components/Home"
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Pve from './components/Pve'
const App = () => {
  return (
    <main className="bg-gray-800 h-screen ">
      <BrowserRouter >
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/pve" exact component={Pve} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App
