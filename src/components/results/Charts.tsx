import React, { useState } from 'react';
import { Subject } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ChartsProps {
  subjects: Subject[];
}

const COLORS = ['#3366CC', '#DC2626', '#2563EB', '#7C3AED', '#D97706', '#059669', '#6B7280'];

const Charts: React.FC<ChartsProps> = ({ subjects }) => {
  const [activeChart, setActiveChart] = useState<'bar' | 'pie' | 'radar'>('bar');
  
  // Prepare data for bar chart
  const barData = subjects.map(subject => ({
    name: subject.course_code,
    Midterm: subject.midterm_marks,
    Endterm: subject.endterm_marks,
    Total: subject.midterm_marks + subject.endterm_marks,
  }));
  
  // Prepare data for pie chart
  const getGradeCounts = () => {
    const gradeCounts: Record<string, number> = {};
    
    subjects.forEach(subject => {
      if (gradeCounts[subject.grade]) {
        gradeCounts[subject.grade]++;
      } else {
        gradeCounts[subject.grade] = 1;
      }
    });
    
    return Object.keys(gradeCounts).map(grade => ({
      name: grade,
      value: gradeCounts[grade]
    }));
  };
  
  const pieData = getGradeCounts();
  
  // Prepare data for radar chart
  const radarData = subjects.map(subject => ({
    subject: subject.course_code,
    score: ((subject.midterm_marks + subject.endterm_marks) / 100) * 100,
  }));
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="card">
      <div className="bg-gradient-to-r from-accent-500 to-accent-700 p-6 text-white">
        <h2 className="text-xl font-semibold mb-1">Performance Visualization</h2>
        <p className="text-accent-100 text-sm">Visual representation of your academic performance</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <button 
            onClick={() => setActiveChart('bar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeChart === 'bar' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bar Chart
          </button>
          <button 
            onClick={() => setActiveChart('pie')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeChart === 'pie' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Grade Distribution
          </button>
          <button 
            onClick={() => setActiveChart('radar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeChart === 'radar' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Performance Radar
          </button>
        </div>
        
        <div className="w-full h-[400px]">
          {activeChart === 'bar' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis label={{ value: 'Marks', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Midterm" fill="#3366CC" />
                <Bar dataKey="Endterm" fill="#00A0B0" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {activeChart === 'pie' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
          
          {activeChart === 'radar' && (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius={130} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Performance" dataKey="score" stroke="#6B5B95" fill="#6B5B95" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;