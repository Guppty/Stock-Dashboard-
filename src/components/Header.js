import React from "react";
import { mockCompanyDetails } from "../constants/mock.js";
import Search from "./Search.js";

const Header = ({name}) => {
    return (
     <>
    <div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <Search/>
    </div>
    {/*<ThemeIcon/>*/}
    </>
    );
};

export default Header;