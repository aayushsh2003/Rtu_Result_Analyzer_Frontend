import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../components/results/UserDetails';
import SubjectTable from '../components/results/SubjectTable';
import Charts from '../components/results/Charts';
import PerformanceMetrics from '../components/results/PerformanceMetrics';
import { ResultData } from '../services/api';
import { ArrowLeft } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedData = localStorage.getItem('resultData');
    const bulkData = localStorage.getItem('bulkResultData');
    
    if (storedData) {
      setResultData(JSON.parse(storedData));
    } else if (bulkData) {
      const results = JSON.parse(bulkData);
      // For now, just show the first result. You could add navigation between results
      setResultData(results[0]);
    }
    
    setLoading(false);
  }, []);
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }
  
  if (!resultData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Result Data Found</h2>
          <p className="text-gray-600 mb-6">Please upload a result PDF to view the analysis.</p>
          <button 
            onClick={handleBackClick} 
            className="btn btn-primary"
          >
            Go to Upload
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={handleBackClick}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Upload
      </button>
      
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RTU Result Analysis</h1>
        <p className="text-gray-600">Detailed breakdown and visualization of your academic performance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 animate-slide-up">
          <UserDetails studentInfo={resultData} />
        </div>
        
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SubjectTable subjects={resultData.subjects} />
        </div>
      </div>
      
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <PerformanceMetrics subjects={resultData.subjects} />
      </div>
      
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <Charts subjects={resultData.subjects} />
      </div>
    </div>
  );
};

export default Dashboard;