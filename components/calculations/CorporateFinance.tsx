import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import CalculationInput from './CalculationInput';
import CalculationResult from './CalculationResult';

export default function CorporateFinance() {
  // Future Value Calculator
  const [fvInputs, setFvInputs] = useState({
    pv: '',
    rate: '',
    years: ''
  });

  const calculateFV = () => {
    const pv = parseFloat(fvInputs.pv);
    const rate = parseFloat(fvInputs.rate) / 100;
    const years = parseFloat(fvInputs.years);
    return pv * Math.pow(1 + rate, years);
  };

  // NPV Calculator
  const [npvInputs, setNpvInputs] = useState({
    initialInvestment: '',
    cashFlows: '',
    discountRate: ''
  });

  const calculateNPV = () => {
    const initialInvestment = parseFloat(npvInputs.initialInvestment);
    const cashFlows = npvInputs.cashFlows.split(',').map(Number);
    const rate = parseFloat(npvInputs.discountRate) / 100;
    
    const npv = cashFlows.reduce((acc, cf, index) => {
      return acc + (cf / Math.pow(1 + rate, index + 1));
    }, -initialInvestment);
    
    return npv;
  };

  // WACC Calculator
  const [waccInputs, setWaccInputs] = useState({
    equityValue: '',
    debtValue: '',
    costOfEquity: '',
    costOfDebt: '',
    taxRate: ''
  });

  const calculateWACC = () => {
    const E = parseFloat(waccInputs.equityValue);
    const D = parseFloat(waccInputs.debtValue);
    const Re = parseFloat(waccInputs.costOfEquity) / 100;
    const Rd = parseFloat(waccInputs.costOfDebt) / 100;
    const T = parseFloat(waccInputs.taxRate) / 100;
    const V = E + D;
    
    return ((E/V) * Re + (D/V) * Rd * (1 - T)) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Future Value Calculator */}
      <CalculatorCard
        title="Future Value (FV)"
        description="Calculate the future value of an investment based on periodic, constant payments and a constant interest rate."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Present Value"
            name="pv"
            value={fvInputs.pv}
            onChange={(e) => setFvInputs({ ...fvInputs, pv: e.target.value })}
            placeholder="Initial investment amount"
          />
          <CalculationInput
            label="Annual Interest Rate (%)"
            name="rate"
            value={fvInputs.rate}
            onChange={(e) => setFvInputs({ ...fvInputs, rate: e.target.value })}
            placeholder="Annual interest rate"
          />
          <CalculationInput
            label="Time (Years)"
            name="years"
            value={fvInputs.years}
            onChange={(e) => setFvInputs({ ...fvInputs, years: e.target.value })}
            placeholder="Number of years"
          />
          {fvInputs.pv && fvInputs.rate && fvInputs.years && (
            <CalculationResult
              label="Future Value"
              value={calculateFV()}
              prefix="$"
            />
          )}
        </div>
      </CalculatorCard>

      {/* NPV Calculator */}
      <CalculatorCard
        title="Net Present Value (NPV)"
        description="Calculate the difference between the present value of cash inflows and outflows over a period of time."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Initial Investment"
            name="initialInvestment"
            value={npvInputs.initialInvestment}
            onChange={(e) => setNpvInputs({ ...npvInputs, initialInvestment: e.target.value })}
            placeholder="Initial investment amount"
          />
          <CalculationInput
            label="Cash Flows (comma-separated)"
            name="cashFlows"
            type="text"
            value={npvInputs.cashFlows}
            onChange={(e) => setNpvInputs({ ...npvInputs, cashFlows: e.target.value })}
            placeholder="e.g., 1000,2000,3000"
          />
          <CalculationInput
            label="Discount Rate (%)"
            name="discountRate"
            value={npvInputs.discountRate}
            onChange={(e) => setNpvInputs({ ...npvInputs, discountRate: e.target.value })}
            placeholder="Discount rate"
          />
          {npvInputs.initialInvestment && npvInputs.cashFlows && npvInputs.discountRate && (
            <CalculationResult
              label="Net Present Value"
              value={calculateNPV()}
              prefix="$"
            />
          )}
        </div>
      </CalculatorCard>

      {/* WACC Calculator */}
      <CalculatorCard
        title="Weighted Average Cost of Capital (WACC)"
        description="Calculate the average rate a company pays to finance its assets, considering both equity and debt."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Market Value of Equity"
            name="equityValue"
            value={waccInputs.equityValue}
            onChange={(e) => setWaccInputs({ ...waccInputs, equityValue: e.target.value })}
            placeholder="Market value of equity"
          />
          <CalculationInput
            label="Market Value of Debt"
            name="debtValue"
            value={waccInputs.debtValue}
            onChange={(e) => setWaccInputs({ ...waccInputs, debtValue: e.target.value })}
            placeholder="Market value of debt"
          />
          <CalculationInput
            label="Cost of Equity (%)"
            name="costOfEquity"
            value={waccInputs.costOfEquity}
            onChange={(e) => setWaccInputs({ ...waccInputs, costOfEquity: e.target.value })}
            placeholder="Required return on equity"
          />
          <CalculationInput
            label="Cost of Debt (%)"
            name="costOfDebt"
            value={waccInputs.costOfDebt}
            onChange={(e) => setWaccInputs({ ...waccInputs, costOfDebt: e.target.value })}
            placeholder="Interest rate on debt"
          />
          <CalculationInput
            label="Tax Rate (%)"
            name="taxRate"
            value={waccInputs.taxRate}
            onChange={(e) => setWaccInputs({ ...waccInputs, taxRate: e.target.value })}
            placeholder="Corporate tax rate"
          />
          {Object.values(waccInputs).every(Boolean) && (
            <CalculationResult
              label="WACC"
              value={calculateWACC()}
              suffix="%"
            />
          )}
        </div>
      </CalculatorCard>
    </div>
  );
}