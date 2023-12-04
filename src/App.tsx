import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FindIdPage from './pages/FindIdPage';
import FindPwPage from './pages/FindPwPage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/id" element={<FindIdPage />} />
        <Route path="/login/pw" element={<FindPwPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
