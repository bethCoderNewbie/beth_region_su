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
  // Static data as fallback
  const staticData = {
    revenueData: [
      {
        quarter: 'Q1\'24',
        UCAN: 4224,
        EMEA: 2958,
        LATAM: 1165,
        APAC: 1023,
      },
      {
        quarter: 'Q2\'24',
        UCAN: 4296,
        EMEA: 3008,
        LATAM: 1204,
        APAC: 1052,
      },
      {
        quarter: 'Q3\'24',
        UCAN: 4322,
        EMEA: 3133,
        LATAM: 1241,
        APAC: 1128,
      },
    ],
    membershipData: [
      {
        quarter: 'Q1\'24',
        UCAN: 82.66,
        EMEA: 91.73,
        LATAM: 47.72,
        APAC: 47.50,
      },
      {
        quarter: 'Q2\'24',
        UCAN: 84.11,
        EMEA: 93.96,
        LATAM: 49.25,
        APAC: 50.32,
      },
      {
        quarter: 'Q3\'24',
        UCAN: 84.80,
        EMEA: 96.13,
        LATAM: 49.18,
        APAC: 52.60,
      },
    ],
    arpmData: [
      {
        quarter: 'Q1\'24',
        UCAN: 17.30,
        EMEA: 10.92,
        LATAM: 8.29,
        APAC: 7.35,
      },
      {
        quarter: 'Q2\'24',
        UCAN: 17.17,
        EMEA: 10.80,
        LATAM: 8.28,
        APAC: 7.17,
      },
      {
        quarter: 'Q3\'24',
        UCAN: 17.06,
        EMEA: 10.99,
        LATAM: 8.40,
        APAC: 7.31,
      },
    ]
  };

  const [data, setData] = useState(staticData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useStaticData, setUseStaticData] = useState(false);

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
        if (result.data) {
          setData(result.data);
          setUseStaticData(false);
        } else {
          setData(staticData);
          setUseStaticData(true);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Using local data due to API error.");
        setData(staticData);
        setUseStaticData(true);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8 bg-gray-50 p-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
        {/* Continue rendering dashboard with static data */}
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 p-8">
      {useStaticData && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-sm text-blue-700">
            Using local data. Connect to API for real-time updates.
          </p>
        </div>
      )}

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
