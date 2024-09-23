import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useQuery from '../hooks/useQuery';
import CodeEditor from '@uiw/react-textarea-code-editor/nohighlight';

const MicInput = forwardRef(({ onSend, messages, language = 'en-US' }, ref) => {
  const [isListening, setIsListening] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
	const timeoutSeconds = 3;
	const navigate = useNavigate();
	const query = useQuery();
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

	useImperativeHandle(ref, () => ({
    startListening() {
      handleStartListening();
    }
  }));

  useEffect(() => {
    // setIsListening(false);
    SpeechRecognition.stopListening();

    clearTimeout(timeoutId);
  }, [code]);

	useEffect(() => {
    if (isListening && transcript.length > 0) {
      startTranscriptTimer();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }
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
		setIsListening(false);
    SpeechRecognition.stopListening();

  	const id = query.get('id');

		navigate('/summary?id=' + id, { state: { report: {id, messages} } });
	}

  const handleCodeButton = () => {
    
    let message = '';

    if (transcript && transcript.trim()) {
      message += transcript;
    }

    if(code){
      message += '|code|' + code;
    }

    if(message){
      setIsListening(false);
      onSend(message);
    }
  }
	
	return (
    <>
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

    {isListening && (
    <div className="code-wrapper">
      <div className="add-code">
        <CodeEditor
          value={code}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={{
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>
      
      <button onClick={handleCodeButton} className="button bg-[#161b22] hover:bg-[#2a384b] mt-3">Send Answer</button>
    </div>)}
    </>
	);
});

export default MicInput;
