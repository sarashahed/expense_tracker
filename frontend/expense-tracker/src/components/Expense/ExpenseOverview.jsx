import React, { useEffect, useState} from "react";
import { LuPlus } from "react-icons/lu"
import { prepareExpenseLineChartData } from "../../Utils/helper";

const ExpenseOverview= ({ transactions, onExpenseIncome }) => {
    const [charData, setCharData] =useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setCharData(result);

        return () => {};
    }, [transactions]);
    return (
        <div> Expensive Overview</div>
    )
    }

    export default ExpenseOverview;