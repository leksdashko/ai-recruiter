import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MicInput = ({ onSend, language }) => {
  const [isListening, setIsListening] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  const handleStartListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language });
    startTranscriptTimer();
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
    }, 3000);

    setTimeoutId(id);
  };

  useEffect(() => {
    if (isListening) {
      startTranscriptTimer();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [transcript]);

  return (
    <div className="mic-input">
      <button
        onClick={isListening ? handleStopListening : handleStartListening}
        className={`button ${isListening ? 'listening' : ''}`}
      >
        {isListening ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default MicInput;
