import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MicInput = forwardRef(({ onSend, language = 'en-US' }, ref) => {
  const [isListening, setIsListening] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
	const timeoutSeconds = import.meta.env.VITE_RECORDING_TIMEOUT || 2;

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
	}

  useEffect(() => {
    if (isListening && transcript.length > 0) {
      startTranscriptTimer();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [transcript]);

	if(isListening){
		return (
			<div className="mic-input mt-[30px]">
				<button
					className="button button-listening listening"
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
	}
});

export default MicInput;
