import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactioninfoCard";
import moment from "moment";

const RecentIncomme = ({ transactions, onSeeMore }) => {
  const sortedIncomes = [...(transactions || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {sortedIncomes.slice(0,4).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncomme;
