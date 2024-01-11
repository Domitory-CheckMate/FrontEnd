import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/join/JoinPage';
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
// import { useEffect, useState } from 'react';
// import {
//   callback,
//   disConnectClient,
//   enterRoomPublish,
//   getPrevChatPublish,
//   getRoomListPublish,
// } from './socket/socketClient';
// import { Client } from '@stomp/stompjs';
import WritePage from './pages/write/WritePage';
import KeywordPage from './pages/write/KeywordPage';
import ChatPage from './pages/chat/ChatPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';

function App() {
  // const [client, changeClient] = useState<Client | null>(null);
  // const [canChat, setCanChat] = useState<boolean>(false);
  // const [canGetPrev, setCanGetPrev] = useState<boolean>(false);

  // useEffect(() => {
  //   const token =
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA0MTMwNDAyLCJleHAiOjE3MDQ3MzUyMDJ9.kl1wCtFSDmAELz5u7k6QWBuntWMa5pGpJVxd6p1ef9s'; // 적절한 토큰 값으로 대체
  //   const client = new Client({
  //     brokerURL: 'wss://checkmate-domitory.shop/ws',
  //     connectHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     debug: (str) => {
  //       console.log(str);
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   client.onConnect = (frame) => {
  //     client.subscribe('/queue/user/1', callback);
  //     console.log('Connected: ' + frame);
  //     changeClient(client);
  //   };

  //   client.activate();

  //   return () => {
  //     disConnectClient(client);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (client !== null) {
  //     console.log('룸리스트 조회');
  //     getRoomListPublish(
  //       client,
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA0MTMwNDAyLCJleHAiOjE3MDQ3MzUyMDJ9.kl1wCtFSDmAELz5u7k6QWBuntWMa5pGpJVxd6p1ef9s',
  //     );
  //     setCanChat(true);
  //   }
  // }, [client]);

  // useEffect(() => {
  //   if (canChat && client !== null) {
  //     console.log('채팅방 입장');
  //     enterRoomPublish(
  //       client,
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA0MTMwNDAyLCJleHAiOjE3MDQ3MzUyMDJ9.kl1wCtFSDmAELz5u7k6QWBuntWMa5pGpJVxd6p1ef9s',
  //       1,
  //       2,
  //     );
  //     setCanGetPrev(true);
  //   }
  // }, [canChat]);

  // useEffect(() => {
  //   if (canGetPrev && client !== null) {
  //     console.log('채팅기록 조회');
  //     getPrevChatPublish(
  //       client,
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA0MTMwNDAyLCJleHAiOjE3MDQ3MzUyMDJ9.kl1wCtFSDmAELz5u7k6QWBuntWMa5pGpJVxd6p1ef9s',
  //       2,
  //       0,
  //     );
  //   }
  // }, [canGetPrev]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/pw" element={<FindPwPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/detail" element={<JoinDetailPage />} />
        <Route path="/join/info" element={<JoinInfoPage />} />
        <Route path="/join/completed" element={<JoinCompletedPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/main" element={<MainPage client={null} />} />
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
