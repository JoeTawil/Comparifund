import React from 'react';

function FundDisplayer({ fund }) {
  const yahooFinanceURL = `https://finance.yahoo.com/quote/${fund.fund_symbol}`;
  
  return (
    <div className="tile">
      <h3>
  <a href={yahooFinanceURL} target="_blank" rel="noopener noreferrer" class="linkButton">
    {fund.fund_symbol}
  </a>
</h3>

      <ul>
        <li>
          <strong>Fund Name:</strong> {fund.fund_long_name}
        </li>
        <li>
          <strong>Fund Category:</strong> {fund.fund_category}
        </li>
        <li>
          <strong>Total Net Assets:</strong> {fund.total_net_assets}
        </li>
        <li>
          <strong>Year-to-Date Return:</strong> {fund.year_to_date_return}
        </li>
        <li>
          <strong>Investment Strategy:</strong> {fund.investment_strategy}
        </li>
        <li>
          <strong>Annual Report Net Expense Ratio:</strong>{' '}
          {fund.fund_annual_report_net_expense_ratio}
        </li>
        <li>
          <strong>Fund Yield:</strong> {fund.fund_yield}
        </li>
        <li>
          <strong>Morningstar Overall Rating:</strong>{' '}
          {fund.morningstar_overall_rating}
        </li>
        <li>
          <strong>Morningstar Risk Rating:</strong> {fund.morningstar_risk_rating}
        </li>
        <li>
          <strong>Sector Allocation to Technology:</strong>{' '}
          {fund.fund_sector_technology}
        </li>
      </ul>
    </div>
  );
}

export default FundDisplayer;
