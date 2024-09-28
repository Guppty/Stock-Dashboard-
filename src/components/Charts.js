import React, { useContext, useState } from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { mockHistoricalData } from "../constants/mock.js"; // Ensure this is correctly imported
import Card from "./Card.js";
import ChartFilter from "./ChartFilter.js";
import { chartConfig } from "../constants/config.js"; // Adjust the path as needed
import ThemeContext from "../context/ThemeContext.js";


const Chart = () => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState('1D'); // Set default filter to '1D'

const {darkMode} = useContext(ThemeContext);
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
            <ul className="flex absolute top-2 right-2 z-40">
                {Object.keys(chartConfig).map((key) => (
                    <li key={key}>
                        <ChartFilter 
                            text={key} 
                            active={filter === key} 
                            onClick={() => {
                                setFilter(key);
                                console.log(`Filter set to: ${key}`);
                            }} 
                        />
                    </li>
                ))}
            </ul>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={formatData(data)}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                            offset="5%" 
                            stopColor={darkMode ? "#312e81" : "rgb(199 210 254) "}
                            stopOpacity={0.8} 
                            />
                            <stop 
                            offset="95%" 
                            stopColor= {darkMode ? "#312e81" : "rgb(199 210 254) "}
                             stopOpacity={0} 
                             />
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#312e81"
                        fillOpacity={1}
                        strokeWidth={0.5}
                        fill="url(#chartColor)"
                    />
                    <Tooltip 
                    contentStyle={darkMode ? {backgroundColor: "#111827"} :null}
                    itemStyle={darkMode ? {color: "#818cf8"} :null}
                    />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Chart;