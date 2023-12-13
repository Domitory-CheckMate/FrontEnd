import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/JoinPage';
import FindIdPage from './pages/login/FindIdPage';
import FindPwPage from './pages/login/FindPwPage';
import LoginPage from './pages/login/LoginPage';
import JoinDetailPage from './pages/JoinDetailPage';
import JoinInfoPage from './pages/JoinInfoPage';
import JoinCompletedPage from './pages/JoinCompletedPage';
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import OnboardingPage2 from './pages/onboarding/OnboardingPage2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/id" element={<FindIdPage />} />
        <Route path="/login/pw" element={<FindPwPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/detail" element={<JoinDetailPage />} />
        <Route path="/join/info" element={<JoinInfoPage />} />
        <Route path="/join/completed" element={<JoinCompletedPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/onboarding/2" element={<OnboardingPage2 />} />
      </Routes>
    </Router>
  );
}

export default App;
