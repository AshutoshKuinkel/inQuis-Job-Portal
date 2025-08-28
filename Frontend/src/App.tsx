import './App.css'
import LoginCard from './pages/auth/login-page'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import SignupCard from './pages/auth/signup-page'
import HomePage from './pages/home'
import AboutPage from './pages/About'
import PageNotFound from './pages/page-not-found'
import JobPage from './pages/job-page'
import PostJob from './pages/employer/PostJob'

const App = ()=>{
  return(
    <main className='h-full tracking-wider'>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginCard/>}/>
          <Route path='/signup' element={<SignupCard/>}/>

          <Route path='' element={<HomePage/>} />
          
          <Route path='/about' element={<AboutPage/>} />

          <Route path='/jobs' element={<JobPage/>}/>

          <Route path='/employer/createJob' element={<PostJob/>}/>


          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
