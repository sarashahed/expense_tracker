import React from 'react';
import { prepareExpenseBarChartData}  from "../../Utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import { useState, useEffect } from 'react';


 const Last30DaysExpenses = ({data}) => {
    const [charData, setCharData] = useState([]);
    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setCharData(result);

        return () => {};
    },[data]);
      
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={charData}/>
        </div>
    )
}

export default Last30DaysExpenses;