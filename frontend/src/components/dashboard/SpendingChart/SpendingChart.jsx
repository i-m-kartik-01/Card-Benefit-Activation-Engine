import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function SpendingChart() {
    return (
        <div
            style={{
                height: 300,
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            Spending Chart
        </div>
    );
}

export default SpendingChart;

// function SpendingChart({ data }) {

//     return (

//         <ResponsiveContainer
//             width="100%"
//             height={300}
//         >

//             <LineChart data={data}>

//                 <XAxis dataKey="month"/>

//                 <YAxis/>

//                 <Tooltip/>

//                 <Line
//                     type="monotone"
//                     dataKey="amount"
//                     stroke="#006FCF"
//                 />

//             </LineChart>

//         </ResponsiveContainer>

//     );

// }

// export default SpendingChart;