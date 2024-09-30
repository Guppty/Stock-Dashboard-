import React, { useContext, useState, useEffect } from "react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { chartConfig } from "../constants/config.js"; 
import { mockHistoricalData } from "../constants/mock.js"; 
import ThemeContext from "../context/ThemeContext.js";
import {
    convertUnixTimestampToDate,
     convertDateToUnixTimestamp, 
     createDate
    } from "../helpers/date-helper.js"
import Card from "./Card.js";
import ChartFilter from "./ChartFilter.js";
import { fetchHistoricalData } from "../api/stock-api.js";
import StockContext from "../context/StockContext.js";

const Chart = () => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState('1W'); 

const {darkMode} = useContext(ThemeContext);
const {stockSymbol} = useContext(StockContext);

useEffect(() => {
    const getDateRange = () => {
        const { days, weeks, months, years } = chartConfig[filter];

        const endDate = new Date();
        const startDate = createDate(endDate, -days, -weeks, -months, -years);
  
        const startTimestampUnix = convertDateToUnixTimestamp(startDate);
        const endTimestampUnix = convertDateToUnixTimestamp(endDate);
       
        return { startTimestampUnix, endTimestampUnix };
    };
    
    const updateChartData = async () => {
      try {
        const {startTimestampUnix, endTimestampUnix} = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
            stockSymbol,
            resolution,
            startTimestampUnix,
            endTimestampUnix
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
}, [stockSymbol,filter]);

    const formatData = () => {
        return data.c.map((item, index) => {
            const dateObject = new Date(data.t[index] * 1000); 
            return {
                value: item.toFixed(2), 
                date: convertUnixTimestampToDate(data.t[index]),
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
            <ResponsiveContainer /* width="100%" height={300} */>
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