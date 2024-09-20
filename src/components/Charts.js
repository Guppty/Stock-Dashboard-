import React, { useState } from "react";
import { mockHistoricalData } from "../constants/mock.js";
import { convertDateToUnixTimestamp } from "../helpers/date-helper.js";
import Card from "./Card";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const Chart = () => {
    const [date,setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W");

const formatData = () => {
    return data.c.map((item, index) =>{
        return {
            value: item.tpFixed(2),
            date: convertDateToUnixTimestamp(date.t[index]),
        };
    });
};

    return (
    <Card>
        <ResponsiveContainer>
            <AreaChart data={formatData(data)}>
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#312e81"
                    fillOpacity={1}
                    strokeWidth={0.5}
                     />
                <Tooltip />
            </AreaChart>
        </ResponsiveContainer>
    </Card>
    );
};

export default Chart;