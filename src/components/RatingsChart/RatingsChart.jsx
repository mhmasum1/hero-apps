import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const RatingsChart = ({ ratings }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ratings</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    layout="vertical"
                    data={ratings}
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar
                        dataKey="count"
                        fill="#ff9800"
                        barSize={25}
                        radius={[5, 5, 5, 5]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RatingsChart;
