import React from 'react'

const Form = () => {
	return (
		<form className="w-[100%] h-[300px] ml-5">
			<textarea rows="7" placeholder="Fill out the job description to make the analysis"></textarea>
			<button className="button bg-[#868af2] hover:bg-[#696cc6] mt-3">Start the conversation</button>
		</form>
	)
}

export default Form