import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Reusable ChartCard component
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

const RegionalDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Color palette
  const colors = {
    background: '#FFFFFF',
    text: '#333333',
    chart: {
      UCAN: '#073763',
      EMEA: '#ffd966',
      LATAM: '#6aa84f',
      APAC: '#cc0000'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://raw.githubusercontent.com/bethCoderNewbie/beth_region_su/main/src/data/data.json');
        setData(result.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="font-medium" style={{
              color: entry.color,
              textShadow: entry.color === '#ffd966' ? '0 0 1px #000' : 'none'
            }}>
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  // Helper function to create Line components
  const createLines = () => {
    return Object.keys(colors.chart).map((region) => (
      <Line
        key={region}
        type="monotone"
        dataKey={region}
        stroke={colors.chart[region]}
        strokeWidth={3}
        dot={{ strokeWidth: 2 }}
      />
    ));
  };

  // Helper function to create Bar components
  const createBars = () => {
    return Object.keys(colors.chart).map((region) => (
      <Bar
        key={region}
        dataKey={region}
        fill={colors.chart[region]}
      />
    ));
  };

  if (!data) return null;

  return (
    <div className="space-y-8 bg-gray-50 p-8">
      <ChartCard title="Quarterly Revenue by Region (Millions USD)">
        <LineChart data={data.revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="quarter" stroke="#4a5568" />
          <YAxis stroke="#4a5568" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          {createLines()}
        </LineChart>
      </ChartCard>

      <ChartCard title="Paid Memberships by Region (Millions)">
        <BarChart data={data.membershipData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="quarter" stroke="#4a5568" />
          <YAxis stroke="#4a5568" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          {createBars()}
        </BarChart>
      </ChartCard>

      <ChartCard title="Average Revenue per Membership (USD)">
        <LineChart data={data.arpmData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="quarter" stroke="#4a5568" />
          <YAxis stroke="#4a5568" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
          {createLines()}
        </LineChart>
      </ChartCard>
    </div>
  );
};

export default RegionalDashboard;
