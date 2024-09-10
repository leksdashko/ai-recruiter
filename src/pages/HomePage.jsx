import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styles } from "../styles";
import RecruiterAvatar from "../components/Avatar/RecruiterAvatar"; 
import { generateVoice } from '../api/11labs';
import axios from 'axios';

const HomePage = () => {
	const location = useLocation();
  const { backJobDescription = '' } = location.state || {};

  const [jobDescription, setJobDescription] = useState(backJobDescription);
  const [errorMessage, setErrorMessage] = useState('');
	const [language, setLanguage] = useState('en-US');
	
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();

    if (jobDescription.trim().length === 0) {
      setErrorMessage('Job description cannot be empty.');
    } else if (jobDescription.trim().length < 200) {
      setErrorMessage('Job description must be at least 200 characters long.');
    } else {
      setErrorMessage('');
			
      navigate('/interview', { state: { jobDescription, language } });
    }
  };

	const startStreaming = async () => {
		const voiceId = "21m00Tcm4TlvDq8ikWAM";
		const text = "Hello, this is a sample text to stream as speech.";
		const apiKey = import.meta.env.VITE_LABS_API_KEY;
		const voiceSettings = {
			stability: 0,
			similarity_boost: 0,
		};

		const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    };

    const requestBody = {
      text,
      voice_settings: voiceSettings,
    };

    try {
      const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
        headers,
        responseType: "blob",
      });

			console.log(response);

      if (response.status === 200) {
				console.log(URL.createObjectURL(response.data));
        const audio = new Audio(URL.createObjectURL(response.data));
        audio.play();
      } else {
        // setError("Error: Unable to stream audio.");
      }
    } catch (error) {
			console.error(error);
      // setError("Error: Unable to stream audio.");
    } finally {
      // setLoading(false);
    }
	}
	


  return (
    <div className={`absolute inset-0 top-[75px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
			<div className='flex flex-col justify-center items-center mt-5'>
				<div className='w-5 h-5 rounded-full bg-[#868af2]' />
				<div className='w-1 sm:h-80 h-40 violet-gradient' />
			</div>

			<div>
				<h1 className={`${styles.heroHeadText}`}>
					Hi, I'm <span className='text-[#868af2] font-black'>AI Interviewer</span>
				</h1>
				<p className={`${styles.heroSubText} mt-2 text-black-100 mb-10`}>
					I simulate an interview with the <br className='sm:block hidden' />
					candidates
				</p>

				<div className="flex justify-between">
					<RecruiterAvatar />
					<div className="w-[100%] h-[300px] ml-5">
						<textarea
							placeholder="Enter job description"
							value={jobDescription}
							onChange={(e) => setJobDescription(e.target.value)}
							rows="7"
							className="w-full" />
						
						{errorMessage && (
							<p className="text-red-500 mt-2">{errorMessage}</p>
						)}

						<button
							onClick={handleStart}
							className="button bg-[#868af2] hover:bg-[#696cc6] mt-3"
						>
							Start Interview
						</button>

						<button
							onClick={startStreaming}
							className="button bg-[#000] hover:bg-[#696cc6] mt-3"
						>
							Start Interview
						</button>
					</div>
				</div>

				<div>
					<label htmlFor="language">Select Language: </label>
					<select
						id="language"
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value="en-US">English (US)</option>
						<option value="es-ES">Spanish (Spain)</option>
						<option value="fr-FR">French (France)</option>
						<option value="de-DE">German (Germany)</option>
						{/* Add more languages as needed */}
					</select>
				</div>
			</div>
		</div>
  );
};

export default HomePage;
