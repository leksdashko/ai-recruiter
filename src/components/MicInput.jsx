import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MicInput = ({ onSend }) => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  const handleStartListening = () => {
    setIsListening(true);
    resetTranscript(); // Reset the transcript on new recording
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
		setIsListening(false);
		SpeechRecognition.stopListening();
		if (transcript && transcript.trim()) {
			onSend(transcript);
		}
	};

  return (
    <div className="mic-input">
      <button
        onClick={isListening ? handleStopListening : handleStartListening}
        className={`button ${isListening ? 'listening' : ''}`}
      >
        {isListening ? 'Stop Recording' : 'Start Recording'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default MicInput;
