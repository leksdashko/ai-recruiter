import React from 'react';

const SummaryReport = ({ report }) => {
  return (
    <div className="summary-report">
      <h2>Interview Summary</h2>
      <p>{report}</p>
    </div>
  );
};

export default SummaryReport;
