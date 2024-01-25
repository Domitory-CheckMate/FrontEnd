import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import CompleteButton from '../join/CompleteButton';
import { postReportChatApi } from '../../api/reportApi';
import { useLocation } from 'react-router-dom';
import CompleteReportBtn from '../../components/reportPage/CompleteReportBtn';
import FailReportBtn from '../../components/reportPage/FailReportBtn';

const ReportDetail = () => {
  const [reportReason, setReportReason] = useState<string>('');
  const [reportComplete, setReportComplete] = useState<boolean>(false);
  const [reportFail, setReportFail] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const location = useLocation();
  const reportCase = location.state.reportCase as string;
  const reportTarget = location.state.reportTarget as string;

  useEffect(() => {
    console.log('신고 상세 페이지 진입');
    console.log('신고 종류 --> ', reportCase);
    console.log('신고 대상 --> ', reportTarget);
  }, []);

  const sendReport = () => {
    if (reportReason.length <= 0) return;
    if (reportCase === 'POST') {
      // 게시글 신고
    } else {
      // 채팅방 신고
      postReportChatApi(reportTarget, reportReason)
        .then((res) => {
          console.log('채팅방 신고 요청 성공 --> ', res);
          setReportComplete(true);
          setReportFail(false);
        })
        .catch((err) => {
          console.error('채팅방 신고 요청 실패 --> ', err);
          setReportComplete(false);
          setReportFail(true);
          setErrorMessage(err.response?.data.message);
        });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center relative">
      <HeaderBar text={reportCase === 'POST' ? '게시글 신고' : '채팅방 신고'} />
      <textarea
        className="grow w-full h-[200px] px-4 py-3 resize-none outline-none mt-5"
        placeholder="신고 사유를 작성해주세요."
        value={reportReason}
        onChange={(e) => setReportReason(e.target.value)}
      />
      <CompleteButton
        text="신고하기"
        isOkToClick={reportReason.length > 0}
        onClick={() => {
          sendReport();
        }}
      />
      {reportComplete && <CompleteReportBtn type="CHAT" />}
      {reportFail && <FailReportBtn message={errorMessage} />}
    </div>
  );
};

export default ReportDetail;
