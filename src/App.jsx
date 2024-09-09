import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated for v6
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import SummaryPage from './pages/SummaryPage';

{/* <Main /> */}
{/* <Description /> */}

const App = () => {
	return (
		<BrowserRouter>
			<div className='relative z-0 bg-primary'>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/interview" element={<InterviewPage />} />
				<Route path="/summary" element={<SummaryPage />} />
			</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;

