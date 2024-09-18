import React from "react";
import Card from "./Card.js";

const Details = ({ details }) => {
    const detailsList = {
        name: "Name",
        country: "Country",
        currency: "Currency",
        exchange: "Exchange",
        ipo: "IPO Date",
        marketCapitalization: "Market Capitalization",
        finnhubIndustry: "Industry",
    };

    const convertMillionToBillion = (number) => {
        return (number / 1000).toFixed(2);
    };

    return (
        <Card>
            <ul className="w-full h-full flex-col divide-y-1">
                {Object.keys(detailsList).map((item) => {
                    return (
                        <li key={item} className="flex justify-between p-2">
                            <span>{detailsList[item]}</span>
                            <span>
                                {item === "marketCapitalization"
                                    ? `$${convertMillionToBillion(details[item])}B`
                                    : details[item]}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};

export default Details;