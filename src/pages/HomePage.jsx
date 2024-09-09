import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styles } from "../styles";
import RecruiterAvatar from "../components/Avatar/RecruiterAvatar";

const HomePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/interview', { state: { jobDescription } });
  };

  return (
		<section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[75px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#868af2]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className='text-[#868af2] font-black'>AI Recruiter</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-black-100 mb-10`}>
            I simulate an interview with the <br className='sm:block hidden' />
            candidates
          </p>

					
						<div className="flex justify-between">
							<RecruiterAvatar />
							<form className="w-[100%] h-[300px] ml-5">
								<textarea 
									placeholder="Enter job description"
									value={jobDescription}
									onChange={(e) => setJobDescription(e.target.value)} rows="7"></textarea>
								<button onClick={handleStart} className="button bg-[#868af2] hover:bg-[#696cc6] mt-3">Start Interview</button>
							</form>
						</div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
