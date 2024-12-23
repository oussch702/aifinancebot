import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import CalculationInput from './CalculationInput';
import CalculationResult from './CalculationResult';

export default function BusinessOperations() {
  // Break-even Analysis Calculator
  const [breakEvenInputs, setBreakEvenInputs] = useState({
    fixedCosts: '',
    pricePerUnit: '',
    variableCostPerUnit: ''
  });

  const calculateBreakEven = () => {
    const fc = parseFloat(breakEvenInputs.fixedCosts);
    const p = parseFloat(breakEvenInputs.pricePerUnit);
    const v = parseFloat(breakEvenInputs.variableCostPerUnit);
    
    return fc / (p - v);
  };

  // Profitability Ratios Calculator
  const [profitabilityInputs, setProfitabilityInputs] = useState({
    revenue: '',
    costOfGoodsSold: '',
    operatingExpenses: '',
    totalAssets: ''
  });

  const calculateProfitabilityRatios = () => {
    const revenue = parseFloat(profitabilityInputs.revenue);
    const cogs = parseFloat(profitabilityInputs.costOfGoodsSold);
    const opex = parseFloat(profitabilityInputs.operatingExpenses);
    const assets = parseFloat(profitabilityInputs.totalAssets);
    
    const grossProfit = revenue - cogs;
    const operatingIncome = grossProfit - opex;
    
    return {
      grossMargin: (grossProfit / revenue) * 100,
      operatingMargin: (operatingIncome / revenue) * 100,
      roa: (operatingIncome / assets) * 100
    };
  };

  // Cash Conversion Cycle Calculator
  const [cccInputs, setCccInputs] = useState({
    daysInventory: '',
    daysReceivables: '',
    daysPayables: ''
  });

  const calculateCCC = () => {
    const daysInventory = parseFloat(cccInputs.daysInventory);
    const daysReceivables = parseFloat(cccInputs.daysReceivables);
    const daysPayables = parseFloat(cccInputs.daysPayables);
    
    return daysInventory + daysReceivables - daysPayables;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Break-even Analysis Calculator */}
      <CalculatorCard
        title="Break-even Analysis"
        description="Calculate the number of units needed to sell to cover all costs."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Fixed Costs"
            name="fixedCosts"
            value={breakEvenInputs.fixedCosts}
            onChange={(e) => setBreakEvenInputs({ ...breakEvenInputs, fixedCosts: e.target.value })}
            placeholder="Total fixed costs"
          />
          <CalculationInput
            label="Price per Unit"
            name="pricePerUnit"
            value={breakEvenInputs.pricePerUnit}
            onChange={(e) => setBreakEvenInputs({ ...breakEvenInputs, pricePerUnit: e.target.value })}
            placeholder="Selling price per unit"
          />
          <CalculationInput
            label="Variable Cost per Unit"
            name="variableCostPerUnit"
            value={breakEvenInputs.variableCostPerUnit}
            onChange={(e) => setBreakEvenInputs({ ...breakEvenInputs, variableCostPerUnit: e.target.value })}
            placeholder="Variable cost per unit"
          />
          {Object.values(breakEvenInputs).every(Boolean) && (
            <CalculationResult
              label="Break-even Point"
              value={calculateBreakEven()}
              suffix=" units"
            />
          )}
        </div>
      </CalculatorCard>

      {/* Profitability Ratios Calculator */}
      <CalculatorCard
        title="Profitability Ratios"
        description="Calculate key profitability metrics including gross margin, operating margin, and return on assets."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Revenue"
            name="revenue"
            value={profitabilityInputs.revenue}
            onChange={(e) => setProfitabilityInputs({ ...profitabilityInputs, revenue: e.target.value })}
            placeholder="Total revenue"
          />
          <CalculationInput
            label="Cost of Goods Sold"
            name="costOfGoodsSold"
            value={profitabilityInputs.costOfGoodsSold}
            onChange={(e) => setProfitabilityInputs({ ...profitabilityInputs, costOfGoodsSold: e.target.value })}
            placeholder="Total COGS"
          />
          <CalculationInput
            label="Operating Expenses"
            name="operatingExpenses"
            value={profitabilityInputs.operatingExpenses}
            onChange={(e) => setProfitabilityInputs({ ...profitabilityInputs, operatingExpenses: e.target.value })}
            placeholder="Total operating expenses"
          />
          <CalculationInput
            label="Total Assets"
            name="totalAssets"
            value={profitabilityInputs.totalAssets}
            onChange={(e) => setProfitabilityInputs({ ...profitabilityInputs, totalAssets: e.target.value })}
            placeholder="Total assets"
          />
          {Object.values(profitabilityInputs).every(Boolean) && (
            <div className="space-y-2">
              <CalculationResult
                label="Gross Margin"
                value={calculateProfitabilityRatios().grossMargin}
                suffix="%"
              />
              <CalculationResult
                label="Operating Margin"
                value={calculateProfitabilityRatios().operatingMargin}
                suffix="%"
              />
              <CalculationResult
                label="Return on Assets (ROA)"
                value={calculateProfitabilityRatios().roa}
                suffix="%"
              />
            </div>
          )}
        </div>
      </CalculatorCard>

      {/* Cash Conversion Cycle Calculator */}
      <CalculatorCard
        title="Cash Conversion Cycle"
        description="Calculate how long it takes to convert resource inputs into cash flows from sales."
      >
        <div className="space-y-4">
          <CalculationInput
            label="Days Inventory Outstanding"
            name="daysInventory"
            value={cccInputs.daysInventory}
            onChange={(e) => setCccInputs({ ...cccInputs, daysInventory: e.target.value })}
            placeholder="Average days to sell inventory"
          />
          <CalculationInput
            label="Days Sales Outstanding"
            name="daysReceivables"
            value={cccInputs.daysReceivables}
            onChange={(e) => setCccInputs({ ...cccInputs, daysReceivables: e.target.value })}
            placeholder="Average days to collect receivables"
          />
          <CalculationInput
            label="Days Payables Outstanding"
            name="daysPayables"
            value={cccInputs.daysPayables}
            onChange={(e) => setCccInputs({ ...cccInputs, daysPayables: e.target.value })}
            placeholder="Average days to pay suppliers"
          />
          {Object.values(cccInputs).every(Boolean) && (
            <CalculationResult
              label="Cash Conversion Cycle"
              value={calculateCCC()}
              suffix=" days"
            />
          )}
        </div>
      </CalculatorCard>
    </div>
  );
}