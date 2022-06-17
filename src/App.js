
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/projects' element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;