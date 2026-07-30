import { useState } from "react";

import AppContext from "./AppContext";

export default function AppProvider({ children }) {

    const [theme, setTheme] = useState("light");

    const value = {

        theme,

        setTheme

    };

    return (

        <AppContext.Provider value={value}>

            {children}

        </AppContext.Provider>

    );

}