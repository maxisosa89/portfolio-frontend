
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import DetailProjectPage from './pages/DetailProjectPage';
import LoginPage from './pages/LoginPage';
//Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import ListProjectsPage from './pages/admin/ListProjectsPage';
import ListMessagesPage from './pages/admin/ListMessagesPage';
import ListTechsPage from './pages/admin/ListTechsPage';
import HomePageEdit from './pages/admin/HomePageEdit';
import AboutEdit from './pages/admin/AboutEdit';
import PrivateRoute from './middlewares/auth';
//NotFound Page
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<DetailProjectPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin/dashboard' element={<PrivateRoute Component={DashboardPage} />} />
        <Route path='/admin/projects' element={<PrivateRoute Component={ListProjectsPage} />} />
        <Route path='/admin/messages' element={<PrivateRoute Component={ListMessagesPage} />} />
        <Route path='/admin/techs' element={<PrivateRoute Component={ListTechsPage} />} />
        <Route path='/admin/home' element={<PrivateRoute Component={HomePageEdit} />} />
        <Route path='/admin/about' element={<PrivateRoute Component={AboutEdit} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;