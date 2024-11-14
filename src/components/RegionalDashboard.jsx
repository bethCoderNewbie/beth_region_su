import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Updated data with complete 2022-2024 history
const dashboardData = {
  revenueData: [
    { quarter: "Q1'22", UCAN: 74.58 * 14.91, EMEA: 73.73 * 11.56, LATAM: 39.61 * 8.37, APAC: 33.72 * 9.21 },
    { quarter: "Q2'22", UCAN: 73.28 * 15.95, EMEA: 72.97 * 11.17, LATAM: 39.62 * 8.67, APAC: 34.80 * 8.83 },
    { quarter: "Q3'22", UCAN: 73.39 * 16.37, EMEA: 73.53 * 10.81, LATAM: 39.94 * 8.58, APAC: 36.23 * 8.34 },
    { quarter: "Q4'22", UCAN: 74.30 * 16.23, EMEA: 76.73 * 10.43, LATAM: 41.70 * 8.30, APAC: 38.02 * 7.69 },
    { quarter: "Q1'23", UCAN: 74.40 * 16.18, EMEA: 77.37 * 10.89, LATAM: 41.25 * 8.60, APAC: 39.48 * 8.03 },
    { quarter: "Q2'23", UCAN: 75.57 * 16.00, EMEA: 79.81 * 10.87, LATAM: 42.47 * 8.58, APAC: 40.55 * 7.66 },
    { quarter: "Q3'23", UCAN: 77.32 * 16.29, EMEA: 83.76 * 10.98, LATAM: 43.65 * 8.85, APAC: 42.43 * 7.62 },
    { quarter: "Q4'23", UCAN: 80.13 * 16.64, EMEA: 88.81 * 10.75, LATAM: 46.00 * 8.60, APAC: 45.34 * 7.31 },
    { quarter: "Q1'24", UCAN: 82.66 * 17.30, EMEA: 91.73 * 10.92, LATAM: 47.72 * 8.29, APAC: 47.50 * 7.35 },
    { quarter: "Q2'24", UCAN: 84.11 * 17.17, EMEA: 93.96 * 10.80, LATAM: 49.25 * 8.28, APAC: 50.32 * 7.17 },
    { quarter: "Q3'24", UCAN: 84.80 * 17.06, EMEA: 96.13 * 10.99, LATAM: 49.18 * 8.40, APAC: 52.60 * 7.31 }
  ].map(quarter => ({
    ...quarter,
    UCAN: Number((quarter.UCAN).toFixed(2)),
    EMEA: Number((quarter.EMEA).toFixed(2)),
    LATAM: Number((quarter.LATAM).toFixed(2)),
    APAC: Number((quarter.APAC).toFixed(2))
  })),
  membershipData: [
    { quarter: "Q1'22", UCAN: 74.58, EMEA: 73.73, LATAM: 39.61, APAC: 33.72 },
    { quarter: "Q2'22", UCAN: 73.28, EMEA: 72.97, LATAM: 39.62, APAC: 34.80 },
    { quarter: "Q3'22", UCAN: 73.39, EMEA: 73.53, LATAM: 39.94, APAC: 36.23 },
    { quarter: "Q4'22", UCAN: 74.30, EMEA: 76.73, LATAM: 41.70, APAC: 38.02 },
    { quarter: "Q1'23", UCAN: 74.40, EMEA: 77.37, LATAM: 41.25, APAC: 39.48 },
    { quarter: "Q2'23", UCAN: 75.57, EMEA: 79.81, LATAM: 42.47, APAC: 40.55 },
    { quarter: "Q3'23", UCAN: 77.32, EMEA: 83.76, LATAM: 43.65, APAC: 42.43 },
    { quarter: "Q4'23", UCAN: 80.13, EMEA: 88.81, LATAM: 46.00, APAC: 45.34 },
    { quarter: "Q1'24", UCAN: 82.66, EMEA: 91.73, LATAM: 47.72, APAC: 47.50 },
    { quarter: "Q2'24", UCAN: 84.11, EMEA: 93.96, LATAM: 49.25, APAC: 50.32 },
    { quarter: "Q3'24", UCAN: 84.80, EMEA: 96.13, LATAM: 49.18, APAC: 52.60 }
  ],
  arpmData: [
    { quarter: "Q1'22", UCAN: 14.91, EMEA: 11.56, LATAM: 8.37, APAC: 9.21 },
    { quarter: "Q2'22", UCAN: 15.95, EMEA: 11.17, LATAM: 8.67, APAC: 8.83 },
    { quarter: "Q3'22", UCAN: 16.37, EMEA: 10.81, LATAM: 8.58, APAC: 8.34 },
    { quarter: "Q4'22", UCAN: 16.23, EMEA: 10.43, LATAM: 8.30, APAC: 7.69 },
    { quarter: "Q1'23", UCAN: 16.18, EMEA: 10.89, LATAM: 8.60, APAC: 8.03 },
    { quarter: "Q2'23", UCAN: 16.00, EMEA: 10.87, LATAM: 8.58, APAC: 7.66 },
    { quarter: "Q3'23", UCAN: 16.29, EMEA: 10.98, LATAM: 8.85, APAC: 7.62 },
    { quarter: "Q4'23", UCAN: 16.64, EMEA: 10.75, LATAM: 8.60, APAC: 7.31 },
    { quarter: "Q1'24", UCAN: 17.30, EMEA: 10.92, LATAM: 8.29, APAC: 7.35 },
    { quarter: "Q2'24", UCAN: 17.17, EMEA: 10.80, LATAM: 8.28, APAC: 7.17 },
    { quarter: "Q3'24", UCAN: 17.06, EMEA: 10.99, LATAM: 8.40, APAC: 7.31 }
  ]
};

const ChartCard = ({ title, children }) => (
  <div className="min-h-[400px] w-full p-6 mb-8 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>
    <div className="h-[300px] w-full">
      {children}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
        <p className="font-bold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RegionalDashboard = () => {
  const colors = {
    UCAN: '#073763',
    EMEA: '#ffd966',
    LATAM: '#6aa84f',
    APAC: '#cc0000'
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <ChartCard title="Quarterly Revenue by Region (Millions USD)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dashboardData.revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {Object.keys(colors).map((region) => (
              <Line
                key={region}
                type="monotone"
                dataKey={region}
                stroke={colors[region]}
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Paid Memberships by Region (Millions)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dashboardData.membershipData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {Object.keys(colors).map((region) => (
              <Bar
                key={region}
                dataKey={region}
                fill={colors[region]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Average Revenue per Membership (USD)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dashboardData.arpmData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {Object.keys(colors).map((region) => (
              <Line
                key={region}
                type="monotone"
                dataKey={region}
                stroke={colors[region]}
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default RegionalDashboard;