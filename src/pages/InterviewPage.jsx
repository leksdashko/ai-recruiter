import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import MicInput from '../components/MicInput';
import RecruiterAvatar from '../components/Avatar/RecruiterAvatar';
import useInterviewFlow from '../hooks/useInterviewFlow';
import { sendJobDescriptionToOpenAI } from '../api/openai';
import { generateVoice } from '../api/11labs';
import { validate as uuidValidate } from 'uuid';
import ErrorPage from './ErrorPage';
import useQuery from '../hooks/useQuery';
import Preloader from '../components/Preloader';


const InterviewPage = () => {
  const location = useLocation();
	const query = useQuery();
  const interviewId = query.get('id');
  const { jobDescription, language } = location.state || {};
	const [hasError, setError] = useState(false);
	const navigate = useNavigate();
  const micRef = useRef();

	useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      navigate('/', { state: { backJobDescription: jobDescription } });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

	useEffect(() => {
		if (!jobDescription) return navigate('/');

    const analyzeJobDescription = async () => {
      try {
        const aiResponse = await sendJobDescriptionToOpenAI(jobDescription);

				generateVoice(aiResponse, () => {
					addMessage({ text: aiResponse, sender: 'ai' });

					micRef.current.startListening();
				});
				
      } catch (error) {
				setError(true);
        console.error('Error sending job description to OpenAI:', error);
        addMessage({ text: 'There was an error processing your request.', sender: 'ai' });
      }
    };

		if(!hasError){
			analyzeJobDescription();
		}
  }, []);

	const { messages, sendMessage, addMessage } = useInterviewFlow(() => {
    micRef.current.startListening();
  });

	if(!interviewId || !uuidValidate(interviewId)){
		return <ErrorPage error="404" />;
	}

	const goBack = () => {
		return navigate('/', { state: { backJobDescription: jobDescription } });
  };

  return (
		<div className={`absolute inset-0 top-0 max-w-7xl mx-auto flex flex-row items-start gap-5`}>
			<Preloader />
			<button className="go-back-btn mt-5" onClick={goBack}>Go Back</button>
			<div className="interview-page">
				<RecruiterAvatar />

				<div className="chat-wrapper">
					<ChatBox messages={messages} />
					<MicInput ref={micRef} onSend={sendMessage} messages={messages} language={language} />
				</div>
			</div>
		</div>
  );
};

export default InterviewPage;