import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/join/JoinPage';
import FindIdPage from './pages/login/FindIdPage';
import FindPwPage from './pages/login/FindPwPage';
import LoginPage from './pages/login/LoginPage';
import JoinDetailPage from './pages/join/JoinDetailPage';
import JoinInfoPage from './pages/join/JoinInfoPage';
import JoinCompletedPage from './pages/join/JoinCompletedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/id" element={<FindIdPage />} />
        <Route path="/login/pw" element={<FindPwPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/detail" element={<JoinDetailPage />} />
        <Route path="/join/info" element={<JoinInfoPage />} />
        <Route path="/join/completed" element={<JoinCompletedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
