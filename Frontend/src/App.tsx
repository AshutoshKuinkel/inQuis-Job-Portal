import './App.css'
import LoginCard from './pages/auth/login-page'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import SignupCard from './pages/auth/signup-page'

const App = ()=>{
  return(
    <main className='h-full tracking-wider'>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginCard/>}/>
          <Route path='/signup' element={<SignupCard/>}/>


        </Routes>
      </Router>
    </main>
  )
}

export default App
