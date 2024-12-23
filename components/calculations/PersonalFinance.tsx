import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import CalculationInput from './CalculationInput';
import CalculationResult from './CalculationResult';

export default function PersonalFinance() {
  // Loan Payment (EMI) Calculator
  const [loanInputs, setLoanInputs] = useState({
    principal: '',
    rate: '',
    years: ''
  });

  const calculateEMI = () => {
    const P = parseFloat(loanInputs.principal);
    const r = (parseFloat(loanInputs.rate) / 100) / 12; // Monthly interest rate
    const n = parseFloat(loanInputs.years) * 12; // Total number of months
    
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  // Retirement Savings Calculator
  const [retirementInputs, setRetirementInputs] = useState({
    currentAge: '',
    retirementAge: '',
    monthlyContribution: '',
    currentSavings: '',
    expectedReturn: ''
  });

  const calculateRetirementSavings = () => {
    const years = parseFloat(retirementInputs.retirementAge) - parseFloat(retirementInputs.currentAge);
    const r = parseFloat(retirementInputs.expectedReturn) / 100 / 12;
    const PMT = parseFloat(retirementInputs.monthlyContribution);
    const PV = parseFloat(retirementInputs.currentSavings);
    const n = years * 12;

    const FV = PV * Math.pow(1 + r, n) + 
               PMT * ((Math.pow(1 + r, n) - 1) / r);
    
    return FV;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Loan Payment Calculator */}
      <CalculatorCard
        title="Loan Payment (EMI)"
        description="Calculate your monthly loan payment based on principal, interest rate, and loan term."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Loan Amount"
            name="principal"
            value={loanInputs.principal}
            onChange={(e) => setLoanInputs({ ...loanInputs, principal: e.target.value })}
            placeholder="Loan amount"
          />
          <CalculationInput
            label="Annual Interest Rate (%)"
            name="rate"
            value={loanInputs.rate}
            onChange={(e) => setLoanInputs({ ...loanInputs, rate: e.target.value })}
            placeholder="Annual interest rate"
          />
          <CalculationInput
            label="Loan Term (Years)"
            name="years"
            value={loanInputs.years}
            onChange={(e) => setLoanInputs({ ...loanInputs, years: e.target.value })}
            placeholder="Number of years"
          />
          {Object.values(loanInputs).every(Boolean) && (
            <CalculationResult
              label="Monthly Payment (EMI)"
              value={calculateEMI()}
              prefix="$"
            />
          )}
        </div>
      </CalculatorCard>

      {/* Retirement Savings Calculator */}
      <CalculatorCard
        title="Retirement Savings"
        description="Calculate your estimated retirement savings based on current savings, contributions, and expected returns."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Current Age"
            name="currentAge"
            value={retirementInputs.currentAge}
            onChange={(e) => setRetirementInputs({ ...retirementInputs, currentAge: e.target.value })}
            placeholder="Your current age"
          />
          <CalculationInput
            label="Retirement Age"
            name="retirementAge"
            value={retirementInputs.retirementAge}
            onChange={(e) => setRetirementInputs({ ...retirementInputs, retirementAge: e.target.value })}
            placeholder="Planned retirement age"
          />
          <CalculationInput
            label="Monthly Contribution"
            name="monthlyContribution"
            value={retirementInputs.monthlyContribution}
            onChange={(e) => setRetirementInputs({ ...retirementInputs, monthlyContribution: e.target.value })}
            placeholder="Monthly savings amount"
          />
          <CalculationInput
            label="Current Savings"
            name="currentSavings"
            value={retirementInputs.currentSavings}
            onChange={(e) => setRetirementInputs({ ...retirementInputs, currentSavings: e.target.value })}
            placeholder="Current retirement savings"
          />
          <CalculationInput
            label="Expected Annual Return (%)"
            name="expectedReturn"
            value={retirementInputs.expectedReturn}
            onChange={(e) => setRetirementInputs({ ...retirementInputs, expectedReturn: e.target.value })}
            placeholder="Expected annual return"
          />
          {Object.values(retirementInputs).every(Boolean) && (
            <CalculationResult
              label="Estimated Retirement Savings"
              value={calculateRetirementSavings()}
              prefix="$"
            />
          )}
        </div>
      </CalculatorCard>
    </div>
  );
}