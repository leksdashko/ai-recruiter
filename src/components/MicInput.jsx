import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useQuery from '../hooks/useQuery';

const MicInput = forwardRef(({ onSend, messages, language = 'en-US' }, ref) => {
  const [isListening, setIsListening] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
	const timeoutSeconds = import.meta.env.VITE_RECORDING_TIMEOUT || 2;
	const navigate = useNavigate();
	const query = useQuery();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }
	
  useImperativeHandle(ref, () => ({
    startListening() {
      handleStartListening();
    }
  }));

  const handleStartListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript && transcript.trim()) {
      onSend(transcript);
    }
    clearTimeout(timeoutId);
  };

  const startTranscriptTimer = () => {
    clearTimeout(timeoutId);
    
    const id = setTimeout(() => {
      return handleStopListening();
    }, timeoutSeconds * 1000);

    setTimeoutId(id);
  };

	const makeSummary = () => {
		handleStopListening();

  	const id = query.get('id');

		navigate('/summary?id=' + id, { state: { report: {id, messages} } });
	}

  useEffect(() => {
    if (isListening && transcript.length > 0) {
      startTranscriptTimer();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [transcript]);
	
	return (
		<div className={`mic-input mt-[30px] ${!isListening ? 'cushidden' : ''}`}>
			<button
				className="button button-listening listening"
				disabled={true}
			>
				<span>Recording...</span>
			</button>

			<button
				onClick={makeSummary}
				className="button button-done mt-3"
			>
				Done answering? Continue
			</button>
		</div>
	);
});

export default MicInput;
