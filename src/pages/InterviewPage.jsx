import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import MicInput from '../components/MicInput';
import RecruiterAvatar from '../components/Avatar/RecruiterAvatar';
import useInterviewFlow from '../hooks/useInterviewFlow';
import { sendJobDescriptionToOpenAI } from '../api/openai';
import { generateVoice } from '../api/11labs';

const InterviewPage = () => {
  const location = useLocation();
  const { jobDescription, language } = location.state || {};
	const [hasError, setError] = useState(false);
	const navigate = useNavigate();
  const micRef = useRef();

  const { messages, sendMessage, addMessage } = useInterviewFlow(() => {
    micRef.current.startListening();
  });

	useEffect(() => {
		if (!jobDescription) return navigate('/');
	}, []);

  useEffect(() => {
    const analyzeJobDescription = async () => {
      try {
        // const aiResponse = await sendJobDescriptionToOpenAI(jobDescription);
				const aiResponse = 'Hi, I am your interviewer';

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

	const goBack = () => {
		return navigate('/', { state: { backJobDescription: jobDescription } });
  };

  return (
		<div className={`absolute inset-0 top-0 max-w-7xl mx-auto flex flex-row items-start gap-5`}>
			<button className="go-back-btn mt-5" onClick={goBack}>Go Back</button>
			<div className="interview-page">
				<RecruiterAvatar />

				<div className="chat-wrapper">
					<ChatBox messages={messages} />
					<MicInput ref={micRef} onSend={sendMessage} language={language} />
				</div>
			</div>
		</div>
  );
};

export default InterviewPage;