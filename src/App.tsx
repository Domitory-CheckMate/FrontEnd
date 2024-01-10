import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/join/JoinPage';
import FindIdPage from './pages/login/FindIdPage';
import FindPwPage from './pages/login/FindPwPage';
import LoginPage from './pages/login/LoginPage';
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import OnboardingPage2 from './pages/onboarding/OnboardingPage2';
import JoinDetailPage from './pages/join/JoinDetailPage';
import JoinInfoPage from './pages/join/JoinInfoPage';
import JoinCompletedPage from './pages/join/JoinCompletedPage';
import MyPage from './pages/myPage/MyPage';
import MembershipPage from './pages/myPage/MembershipPage';
import ChecklistPage from './pages/myPage/ChecklistPage';
import MainPage from './pages/main/MainPage';
import KeywordMatchingPage from './pages/main/KeywordMatchingPage';
import MateMatchingPage from './pages/main/MateMatchingPage';
import ArticlePage from './pages/article/ArticlePage';
import WritePage from './pages/write/WritePage';
import KeywordPage from './pages/write/KeywordPage';
import ChatPage from './pages/chat/ChatPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';

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
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/keyword" element={<KeywordMatchingPage />} />
        <Route path="/main/mate" element={<MateMatchingPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/onboarding/2" element={<OnboardingPage2 />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/keyword" element={<KeywordPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatroom" element={<ChatRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
