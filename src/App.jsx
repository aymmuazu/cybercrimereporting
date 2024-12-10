import './assets/css/app.css'
import './assets/css/bootstrap.min.css'
import './assets/css/fontawesome-all.min.css'
import './assets/css/swiper.css'
import './assets/css/styles.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar';
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Notfound from './Pages/Notfound'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import Password from './Pages/Password'
import Report from './Pages/Report'
import MyReport from './Pages/MyReport'
import ViewReport from './Pages/ViewReport'
import EditReport from './Pages/EditReport'
import ViewAllReport from './Pages/ViewAllReport'

const app_name = process.env.APP_NAME;

const App = () => {
  return (
   <Router>
      <Navbar app_name={app_name} />
      <Routes>
        <Route path='/' element={<Home app_name={app_name}/>}/>
        <Route path='/login' element={<Login app_name={app_name}/>} />
        <Route path='/register'   element={<Register app_name={app_name}/>} />
        
        <Route path='/dashboard' element={<Dashboard app_name={app_name}/>} />
        <Route path='/profile' element={<Profile app_name={app_name}/>} />
        <Route path='/profile/changepassword' element={<Password app_name={app_name}/>} />

        <Route path='/dashboard/addreport' element={<Report app_name={app_name}/>} />
        <Route path='/dashboard/myreport' element={<MyReport app_name={app_name}/>} />
        <Route path='/dashboard/myreport/view/:id' element={<ViewReport app_name={app_name}/>} />
        <Route path='/dashboard/myreport/edit/:id' element={<EditReport app_name={app_name}/>} />

        <Route path='/dashboard/admin/allreports' element={<ViewAllReport app_name={app_name} />} />

        <Route path="*" element={<Notfound  app_name={app_name}/>} />
      </Routes>
      <Footer />
   </Router>
  )
}

export default App
