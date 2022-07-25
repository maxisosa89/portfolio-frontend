
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import SkillsPage from './pages/SkillsPage';
import DetailProjectPage from './pages/DetailProjectPage';
import LoginPage from './pages/LoginPage';
//Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import ListProjectsPage from './pages/admin/ListProjectsPage';
import ListMessagesPage from './pages/admin/ListMessagesPage';
import ListTechsPage from './pages/admin/ListTechsPage';
import PrivateRoute from './middlewares/auth'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<DetailProjectPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/skills' element={<SkillsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin/dashboard' element={<PrivateRoute Component={DashboardPage} />} />
        <Route path='/admin/projects' element={<PrivateRoute Component={ListProjectsPage} />} />
        <Route path='/admin/messages' element={<PrivateRoute Component={ListMessagesPage} />} />
        <Route path='/admin/techs' element={<PrivateRoute Component={ListTechsPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;