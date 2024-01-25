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
import { useEffect, useState } from 'react';
import {
  disConnectClient,
  getNotReadCntPublish,
  getRoomListPublish,
} from './socket/socketClient';
import { Client } from '@stomp/stompjs';
import WritePage from './pages/write/WritePage';
import ChatPage from './pages/chat/ChatPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';
import { getAccessToken, getMemberId } from './api/manageLocalStorage';
import { socketRoomType } from './socket/responseType';
import SearchPage from './pages/search/SearchPage';
import MyScrapPage from './pages/main/MyScrapPage';
import MajorSearchPage from './pages/join/MajorSearchPage';
import ReportDetail from './components/chatPage/ReportDetail';
import { RecoilRoot } from 'recoil';
import MyPostPage from './pages/myPage/MyPostPage';
import SettingsPage from './pages/myPage/Settings';

function App() {
  const token: string = getAccessToken() || '';
  const [client, changeClient] = useState<Client | null>(null);
  const [chatRoomList, setChatRoomList] = useState<socketRoomType[]>([]);
  const [notReadCnt, setNotReadCnt] = useState<number>(0);

  const subscribeClientCallback = (message: { body: string }) => {
    try {
      if (message.body) {
        const data = JSON.parse(message.body);
        console.log('유저 구독 데이터 받음 --> ', data);
        if (data.messageType === 'ROOM_LIST') {
          console.log('룸리스트 데이터 성공 --> ', data.data);
          setChatRoomList(data.data.chatRoomList);
        } else if (data.messageType === 'NOT_READ_COUNT') {
          console.log('안 읽은 메세지 갯수 조회 데이터 성공 --> ', data.data);
          setNotReadCnt(data.data.notReadCount);
        } else {
          console.log('예상되는 유저 구독 데이터가 아닙니다.');
        }
      } else {
        console.error('Message body is empty or undefined.');
      }
    } catch (err) {
      console.error('Error parsing : ', err);
    }
  };

  useEffect(() => {
    if (token === '' || token === null) {
      return;
    }

    const client = new Client({
      brokerURL: process.env.REACT_APP_SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      const myId = getMemberId();
      client.subscribe(`/queue/user/${myId}`, subscribeClientCallback);
      console.log('Connected: ' + frame);
      changeClient(client);
    };

    client.activate();

    return () => {
      disConnectClient(client);
    };
  }, []);

  useEffect(() => {
    if (client !== null) {
      console.log('룸리스트 조회');
      getRoomListPublish(client, token);

      console.log('안 읽은 메세지 갯수 조회');
      getNotReadCntPublish(client, token);
    }
  }, [client]);

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

  useEffect(() => {
    const token = getAccessToken();
    const memberId = getMemberId();
    if (
      (token === null || memberId === null) &&
      window.location.pathname !== '/' &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/login/pw' &&
      window.location.pathname !== '/join' &&
      window.location.pathname !== '/join/detail' &&
      window.location.pathname !== '/join/info' &&
      window.location.pathname !== '/join/mbti' &&
      window.location.pathname !== '/join/completed' &&
      window.location.pathname !== '/onboarding'
    ) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/pw" element={<FindPwPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/join/detail" element={<JoinDetailPage />} />
          <Route path="/join/major" element={<MajorSearchPage />} />
          <Route path="/join/info" element={<JoinInfoPage />} />
          <Route path="/join/mbti" element={<OnboardingPage2 />} />
          <Route path="/join/completed" element={<JoinCompletedPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/main" element={<MainPage notReadCnt={notReadCnt} />} />
          <Route path="/main/keyword" element={<KeywordMatchingPage />} />
          <Route path="/main/mate" element={<MateMatchingPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/my-page" element={<MyPage notReadCnt={notReadCnt} />} />
          <Route path="/my-post" element={<MyPostPage />} />
          <Route path="/my/scrap" element={<MyScrapPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/chat"
            element={
              <ChatPage chatRoomList={chatRoomList} notReadCnt={notReadCnt} />
            }
          />
          <Route
            path="/chat/:receiverId"
            element={<ChatRoomPage client={client} />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/report" element={<ReportDetail />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
