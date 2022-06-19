
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import SkillsPage from './pages/SkillsPage';
import DetailProjectPage from './pages/DetailProjectPage';
//Admin Pages
import DashboardPage from './pages/admin/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path= '/projects' element={<ProjectsPage />} />
        <Route path= '/projects/:id' element={<DetailProjectPage />} />
        <Route path= '/about' element={<AboutPage />} />
        <Route path= '/contact' element={<ContactPage />} />
        <Route path= '/skills' element={<SkillsPage />} />
        <Route path= '/admin/dashboard' element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;