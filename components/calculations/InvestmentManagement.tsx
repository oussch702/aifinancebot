import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import CalculationInput from './CalculationInput';
import CalculationResult from './CalculationResult';

export default function InvestmentManagement() {
  // CAPM Calculator
  const [capmInputs, setCapmInputs] = useState({
    riskFreeRate: '',
    beta: '',
    marketReturn: ''
  });

  const calculateCAMP = () => {
    const rf = parseFloat(capmInputs.riskFreeRate) / 100;
    const beta = parseFloat(capmInputs.beta);
    const rm = parseFloat(capmInputs.marketReturn) / 100;
    
    return (rf + beta * (rm - rf)) * 100;
  };

  // Sharpe Ratio Calculator
  const [sharpeInputs, setSharpeInputs] = useState({
    portfolioReturn: '',
    riskFreeRate: '',
    standardDeviation: ''
  });

  const calculateSharpeRatio = () => {
    const rp = parseFloat(sharpeInputs.portfolioReturn) / 100;
    const rf = parseFloat(sharpeInputs.riskFreeRate) / 100;
    const sd = parseFloat(sharpeInputs.standardDeviation) / 100;
    
    return (rp - rf) / sd;
  };

  // ROI Calculator
  const [roiInputs, setRoiInputs] = useState({
    initialInvestment: '',
    finalValue: ''
  });

  const calculateROI = () => {
    const initial = parseFloat(roiInputs.initialInvestment);
    const final = parseFloat(roiInputs.finalValue);
    
    return ((final - initial) / initial) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* CAPM Calculator */}
      <CalculatorCard
        title="Capital Asset Pricing Model (CAPM)"
        description="Calculate the expected return of an investment based on systematic risk and market return."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Risk-Free Rate (%)"
            name="riskFreeRate"
            value={capmInputs.riskFreeRate}
            onChange={(e) => setCapmInputs({ ...capmInputs, riskFreeRate: e.target.value })}
            placeholder="e.g., Treasury bond yield"
          />
          <CalculationInput
            label="Beta (β)"
            name="beta"
            value={capmInputs.beta}
            onChange={(e) => setCapmInputs({ ...capmInputs, beta: e.target.value })}
            placeholder="Asset's beta value"
          />
          <CalculationInput
            label="Market Return (%)"
            name="marketReturn"
            value={capmInputs.marketReturn}
            onChange={(e) => setCapmInputs({ ...capmInputs, marketReturn: e.target.value })}
            placeholder="Expected market return"
          />
          {Object.values(capmInputs).every(Boolean) && (
            <CalculationResult
              label="Expected Return"
              value={calculateCAMP()}
              suffix="%"
            />
          )}
        </div>
      </CalculatorCard>

      {/* Sharpe Ratio Calculator */}
      <CalculatorCard
        title="Sharpe Ratio"
        description="Measure the risk-adjusted return of an investment compared to a risk-free asset."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Portfolio Return (%)"
            name="portfolioReturn"
            value={sharpeInputs.portfolioReturn}
            onChange={(e) => setSharpeInputs({ ...sharpeInputs, portfolioReturn: e.target.value })}
            placeholder="Annual portfolio return"
          />
          <CalculationInput
            label="Risk-Free Rate (%)"
            name="riskFreeRate"
            value={sharpeInputs.riskFreeRate}
            onChange={(e) => setSharpeInputs({ ...sharpeInputs, riskFreeRate: e.target.value })}
            placeholder="Risk-free rate"
          />
          <CalculationInput
            label="Standard Deviation (%)"
            name="standardDeviation"
            value={sharpeInputs.standardDeviation}
            onChange={(e) => setSharpeInputs({ ...sharpeInputs, standardDeviation: e.target.value })}
            placeholder="Portfolio standard deviation"
          />
          {Object.values(sharpeInputs).every(Boolean) && (
            <CalculationResult
              label="Sharpe Ratio"
              value={calculateSharpeRatio()}
            />
          )}
        </div>
      </CalculatorCard>

      {/* ROI Calculator */}
      <CalculatorCard
        title="Return on Investment (ROI)"
        description="Calculate the percentage return on an investment relative to its cost."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Initial Investment"
            name="initialInvestment"
            value={roiInputs.initialInvestment}
            onChange={(e) => setRoiInputs({ ...roiInputs, initialInvestment: e.target.value })}
            placeholder="Initial investment amount"
          />
          <CalculationInput
            label="Final Value"
            name="finalValue"
            value={roiInputs.finalValue}
            onChange={(e) => setRoiInputs({ ...roiInputs, finalValue: e.target.value })}
            placeholder="Final investment value"
          />
          {Object.values(roiInputs).every(Boolean) && (
            <CalculationResult
              label="ROI"
              value={calculateROI()}
              suffix="%"
            />
          )}
        </div>
      </CalculatorCard>
    </div>
  );
}