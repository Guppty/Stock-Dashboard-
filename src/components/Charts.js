import React, { useState } from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { mockHistoricalData } from "../constants/mock.js";
import Card from "./Card.js";

const convertDateToUnixTimestamp = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Input is not a valid Date object");
    }
    return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp in seconds
};

const Chart = () => {
    const [data, setData] = useState(mockHistoricalData); // Using the mock historical data

    const formatData = () => {
        return data.c.map((item, index) => {
            const dateObject = new Date(data.t[index] * 1000); // Convert seconds to milliseconds
            return {
                value: item.toFixed(2), // Format the value to 2 decimal places
                date: dateObject.toLocaleDateString(), // Convert to a readable date string
            };
        });
    };

    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={formatData()}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#312e81" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#312e81" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#312e81"
                        fill="url(#colorUv)"
                        fillOpacity={1}
                        strokeWidth={0.5}
                    />
                    <Tooltip />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Chart;
