// import { Routes, Route } from "react-router-dom";

// import Dashboard from "../pages/Dashboard/Dashboard";
// import UploadReceipt from "../pages/UploadReceipt/UploadReceipt";
// import TransactionDetails from "../pages/TransactionDetails/TransactionDetails";
// import Benefits from "../pages/Benefits/Benefits";
// import Claims from "../pages/Claims/Claims";
// import History from "../pages/History/History";
// import NotFound from "../pages/NotFound/NotFound";

// function AppRoutes() {
//     return (
//         <Routes>
//             <Route path="/" element={<Dashboard />} />

//             <Route
//                 path="/upload"
//                 element={<UploadReceipt />}
//             />

//             <Route
//                 path="/history"
//                 element={<History />}
//             />

//             <Route
//                 path="/benefits"
//                 element={<Benefits />}
//             />

//             <Route
//                 path="/claims"
//                 element={<Claims />}
//             />

//             <Route
//                 path="/transaction/:id"
//                 element={<TransactionDetails />}
//             />

//             <Route
//                 path="*"
//                 element={<NotFound />}
//             />
//         </Routes>
//     );
// }

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import UploadReceipt from "../pages/UploadReceipt/UploadReceipt";
import TransactionDetails from "../pages/TransactionDetails/TransactionDetails";
import Benefits from "../pages/Benefits/Benefits";
import Claims from "../pages/Claims/Claims";
import History from "../pages/History/History";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
                path="/upload"
                element={<UploadReceipt />}
            />

            <Route
                path="/history"
                element={<History />}
            />

            <Route
                path="/benefits"
                element={<Benefits />}
            />

            <Route
                path="/claims"
                element={<Claims />}
            />

            <Route
                path="/transaction/:id"
                element={<TransactionDetails />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
}

export default AppRoutes;