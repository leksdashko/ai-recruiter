import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated for v6
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import SummaryPage from './pages/SummaryPage';
import { styles } from "./styles";

const App = () => {
	return (
		<BrowserRouter>
			<div className='relative z-0 bg-primary'>
				<section className={`relative w-full h-screen mx-auto`}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/interview" element={<InterviewPage />} />
						<Route path="/summary" element={<SummaryPage />} />
					</Routes>
				</section>
			</div>
		</BrowserRouter>
	);
};

export default App;

