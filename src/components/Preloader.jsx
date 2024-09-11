import React, { useEffect, useState } from 'react';
import './Preloader.css';
import RecruiterAvatar from './Avatar/RecruiterAvatar';

const Preloader = () => {
	const [isLoading, setLoading] = useState(true);
	const [remove, setRemove] = useState(false);

	useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

		const timeoutId2 = setTimeout(() => {
      setRemove(true);
    }, 1500);

    return () => {
			clearTimeout(timeoutId);
			clearTimeout(timeoutId2);
		}
  }, []);

	if(remove) return '';

  return (
    <div className={`preloader ${isLoading ? 'show' : ''}`}>
			<RecruiterAvatar preloader={true} />
    </div>
  );
};

export default Preloader;