import React from 'react';
import { useLocation } from 'react-router-dom';
import SummaryReport from '../components/SummaryReport';

const SummaryPage = () => {
  const location = useLocation();
  const { report } = location.state;

  return (
    <div className="summary-page">
      <SummaryReport report={report} />
    </div>
  );
};

export default SummaryPage;
