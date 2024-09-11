import React from 'react';
import { styles } from "../styles";

const ErrorPage = ({error}) => {
	return (
		<div className={`absolute inset-0 top-[75px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
			<div className='flex flex-col justify-center items-center mt-5'>
				<div className='w-5 h-5 rounded-full bg-[#868af2]' />
				<div className='w-1 sm:h-80 h-40 violet-gradient' />
			</div>

			<div>
				<h1 className={`${styles.heroHeadText}`}>
					{error}
				</h1>
			</div>
		</div>
	)
}

export default ErrorPage