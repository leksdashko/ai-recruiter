import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryReport from '../components/SummaryReport';
import useQuery from '../hooks/useQuery';
import { validate as uuidValidate } from 'uuid';

const SummaryPage = () => {
  const location = useLocation();
  const { report } = location.state || {};
	const navigate = useNavigate();
	const query = useQuery();
  const interviewId = query.get('id');

	if(!interviewId || !uuidValidate(interviewId)){
		return <ErrorPage error="404" />;
	}

	useEffect(() => {
    if (!report) {
      navigate('/');
    }
  }, [report, navigate]);

  return (
    <div className="summary-page">
      {report ? <SummaryReport report={report} /> : null}
    </div>
  );
};

export default SummaryPage;
