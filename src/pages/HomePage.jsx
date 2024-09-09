import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styles } from "../styles";
import RecruiterAvatar from "../components/Avatar/RecruiterAvatar";

const HomePage = () => {
	const location = useLocation();
  const { backJobDescription } = location.state;

  const [jobDescription, setJobDescription] = useState(backJobDescription);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();

    if (jobDescription.trim().length === 0) {
      setErrorMessage('Job description cannot be empty.');
    } else if (jobDescription.trim().length < 200) {
      setErrorMessage('Job description must be at least 200 characters long.');
    } else {
      setErrorMessage('');
			
      navigate('/interview', { state: { jobDescription } });
    }
  };

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
					</div>
				</div>
			</div>
		</div>
  );
};

export default HomePage;
