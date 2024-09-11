import React from 'react';
import { styles } from "../styles";
import { useRef } from 'react';
import {createPDF} from '../services/PDF';

const SummaryReport = ({ report }) => {
	const {id, messages} = report;
	const targetRef = useRef();
	const pdfName = 'summary_'+id+'.pdf';

  return (
		<div className={`pt-[50px] max-w-7xl mx-auto ${styles.paddingX}`}>
			<button className="button button-pdf my-10" onClick={() => createPDF(targetRef, {filename: pdfName})}>Download PDF</button>
         
			<div ref={targetRef}>
				<h1 className="text-[#000] mb-5">
					<p className="text-3xl font-bold">Interview Summary ID:</p>
					<span className='text-[#868af2]'>{id}</span>
				</h1>
				<div className="summary-report">
					{messages.map((msg, index) => (
						<div key={index} className={`message msg-${msg.sender} py-2`}>
							<span className={`text-xl ${msg.sender === 'ai' ? 'text-[#6367dd]' : 'text-[#929292]'}`}>{msg.sender === 'ai' ? 'AI Interviewer' : 'User'}</span>
							<p className="text-[#000]">{msg.text}</p>
						</div>
					))}	
				</div>
			</div>
		</div>
  );
};

export default SummaryReport;
