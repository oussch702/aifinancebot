import React from 'react';
import DailyNotes from './DailyNotes';
import FinancialHealthScore from './FinancialHealthScore';
import FinancialDetailsForm from './FinancialDetailsForm';

export default function MainContent() {
  return (
    <div className="space-y-8">
      {/* Notes Section - Full Width */}
      <DailyNotes />

      {/* Financial Health Score */}
      <FinancialHealthScore />

      {/* Financial Details Form */}
      <FinancialDetailsForm />
    </div>
  );
}