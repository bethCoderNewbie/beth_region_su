import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import your data directly
const dashboardData = {
  "revenueData": [
    {
      "quarter": "Q1'24",
      "UCAN": 4224,
      "EMEA": 2958,
      "LATAM": 1165,
      "APAC": 1023
    },
    {
      "quarter": "Q2'24",
      "UCAN": 4296,
      "EMEA": 3008,
      "LATAM": 1204,
      "APAC": 1052
    },
    {
      "quarter": "Q3'24",
      "UCAN": 4322,
      "EMEA": 3133,
      "LATAM": 1241,
      "APAC": 1128
    }
  ],
  "membershipData": [
    {
      "quarter": "Q1'24",
      "UCAN": 82.66,
      "EMEA": 91.73,
      "LATAM": 47.72,
      "APAC": 47.50
    },
    {
      "quarter": "Q2'24",
      "UCAN": 84.11,
      "EMEA": 93.96,
      "LATAM": 49.25,
      "APAC": 50.32
    },
    {
      "quarter": "Q3'24",
      "UCAN": 84.80,
      "EMEA": 96.13,
      "LATAM": 49.18,
      "APAC": 52.60
    }
  ],
  "arpmData": [
    {
      "quarter": "Q1'24",
      "UCAN": 17.30,
      "EMEA": 10.92,
      "LATAM": 8.29,
      "APAC": 7.35
    },
    {
      "quarter": "Q2'24",
      "UCAN": 17.17,
      "EMEA": 10.80,
      "LATAM": 8.28,
      "APAC": 7.17
    },
    {
      "quarter": "Q3'24",
      "UCAN": 17.06,
      "EMEA": 10.99,
      "LATAM": 8.40,
      "APAC": 7.31
    }
  ]
};

const ChartCard = ({ title, children }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
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
  // Color palette
  const colors = {
    UCAN: '#073763',
    EMEA: '#ffd966',
    LATAM: '#6aa84f',
    APAC: '#cc0000'
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50">
      <ChartCard title="Quarterly Revenue by Region (Millions USD)">
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
      </ChartCard>

      <ChartCard title="Paid Memberships by Region (Millions)">
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
      </ChartCard>

      <ChartCard title="Average Revenue per Membership (USD)">
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
      </ChartCard>
    </div>
  );
};

export default RegionalDashboard;
