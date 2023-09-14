import React, { useEffect, useRef, useState } from 'react';
import FundDisplayer from './FundDisplayer';
import records from './datasets/converted.json';

function Fundlist({ roi, volatility, esg }) {
  const [sortBy, setSortBy] = useState('roi'); // Set the default sorting to 'roi'
  const [selectedFund, setSelectedFund] = useState(null);

  const arrFunds = useRef([]);

  useEffect(() => {
    arrFunds.current = [];

    for (let i = 0; i < records.length; i++) {
      const fund = records[i];
      const calculatedEsg =
        (Number(fund.esg_score) +
          Number(fund.environment_score) +
          Number(fund.sustainability_score) +
          Number(fund.social_score) +
          Number(fund.governance_score)) /
        5; // Calculate the average ESG score
        
        fund.calculatedEsg = calculatedEsg;

        const calculatedRoi =
        (Number(fund.fund_yield) + // .05 - .15
        (Number(fund.morningstar_overall_rating) / 30) + // 3
        Number(fund.fund_mean_annual_return_10years)) / // .05 - .15 
        3; // Calculate the average ROI score

        fund.calculatedRoi = (calculatedRoi * 100) + "%";

      if (
        calculatedEsg >= esg &&
        Number(fund.morningstar_risk_rating) !== undefined &&
        Number(fund.morningstar_risk_rating) >= volatility &&
        calculatedRoi >= roi / 100
      ) {

        arrFunds.current.push(fund);
      }
    }
  }, [roi, volatility, esg]);

  const sortedFunds = [...arrFunds.current];
  if (sortBy === 'esg') {
    sortedFunds.sort((a, b) => {
      const calculatedEsgA =
        (Number(a.esg_score) +
          Number(a.environment_score) +
          Number(a.social_score) +
          Number(a.governance_score)) /
        4;
      const calculatedEsgB =
        (Number(b.esg_score) +
          Number(b.environment_score) +
          Number(b.social_score) +
          Number(b.governance_score)) /
        4;
      return calculatedEsgB - calculatedEsgA;
    });
  } else if (sortBy === 'roi') {
    sortedFunds.sort((a, b) => b.fund_yield - a.fund_yield);
  } else if (sortBy === 'volatility') {
    sortedFunds.sort(
      (a, b) => a.morningstar_risk_rating - b.morningstar_risk_rating
    );
  }

  return (
    <div>
      <div className='container'>
        <div className="sortDropdown">
          <label htmlFor="sortSelect">Sort By: </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="esg">ESG</option>
            <option value="roi">ROI</option>
            <option value="volatility">Volatility</option>
          </select>
        </div>
        <table className="fundTable">
          <thead>
            <tr>
              <th className="SymbolHeader">Fund Symbol</th>     
              
              <th className="SymbolHeader">ROI</th>
              <th className="SymbolHeader">Volatility</th>
              <th className="SymbolHeader">ESG</th>
            </tr>
          </thead>
          <tbody>
            {sortedFunds.map((fund) => (
              <tr
                key={fund.fund_symbol}
                className="fundTableRow"
                onClick={() => setSelectedFund(fund)}
              >
                <td>{fund.fund_symbol}</td>
                <td>{fund.calculatedRoi}</td>
                <td>{fund.morningstar_risk_rating}</td>
                <td>{fund.calculatedEsg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedFund && <FundDisplayer fund={selectedFund} />}
    </div>
  );
}

export default Fundlist;