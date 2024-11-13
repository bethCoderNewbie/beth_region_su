import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegionalDashboard = () => {
  // Final color palette
  const colors = {
    background: '#FFFFFF',  // White Background
    text: '#333333',       // Dark Text
    chart: {
      UCAN: '#073763',     // Deep Blue
      EMEA: '#ffd966',     // Gold
      LATAM: '#6aa84f',    // Green
      APAC: '#cc0000'      // Red
    }
  };

  const revenueData = [
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
  ];

  const membershipData = [
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
  ];

  const arpmData = [
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
  ];

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

  return (
    <div className="space-y-8 bg-gray-50 p-8">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Quarterly Revenue by Region (Millions USD)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="quarter" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="UCAN" 
                stroke={colors.chart.UCAN} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="EMEA" 
                stroke={colors.chart.EMEA} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="LATAM" 
                stroke={colors.chart.LATAM} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="APAC" 
                stroke={colors.chart.APAC} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Paid Memberships by Region (Millions)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={membershipData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="quarter" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Bar dataKey="UCAN" fill={colors.chart.UCAN} />
              <Bar dataKey="EMEA" fill={colors.chart.EMEA} />
              <Bar dataKey="LATAM" fill={colors.chart.LATAM} />
              <Bar dataKey="APAC" fill={colors.chart.APAC} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Average Revenue per Membership (USD)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={arpmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="quarter" stroke="#4a5568" />
              <YAxis stroke="#4a5568" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="UCAN" 
                stroke={colors.chart.UCAN} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="EMEA" 
                stroke={colors.chart.EMEA} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="LATAM" 
                stroke={colors.chart.LATAM} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="APAC" 
                stroke={colors.chart.APAC} 
                strokeWidth={3}
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RegionalDashboard;
