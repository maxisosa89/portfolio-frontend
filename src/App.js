
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path= '/projects' element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;