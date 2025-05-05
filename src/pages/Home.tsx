import React, { useState } from 'react';
import UploadForm from '../components/upload/UploadForm';
import BulkUploadForm from '../components/upload/BulkUploadForm';
import { FileCheck, PieChart, Award, FileText } from 'lucide-react';

const Home: React.FC = () => {
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Rajasthan Technical University Student Result Analyzer</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your RTU result PDF and get detailed insights into your academic performance
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setUploadMode('single')}
            className={`btn ${uploadMode === 'single' ? 'btn-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Single Upload
          </button>
          <button
            onClick={() => setUploadMode('bulk')}
            className={`btn ${uploadMode === 'bulk' ? 'btn-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Bulk Upload
          </button>
        </div>
        
        <div className="animate-slide-up">
          {uploadMode === 'single' ? <UploadForm /> : <BulkUploadForm />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
        <FeatureCard 
          icon={<FileCheck className="h-10 w-10 text-primary-600" />}
          title="Easy Upload"
          description="Simply drag and drop your RTU result PDF to get started with the analysis"
        />
        <FeatureCard 
          icon={<FileText className="h-10 w-10 text-primary-600" />}
          title="Detailed Overview"
          description="View comprehensive details of your academic performance"
        />
        <FeatureCard 
          icon={<PieChart className="h-10 w-10 text-primary-600" />}
          title="Visual Analytics"
          description="Interactive charts to visualize your performance across subjects"
        />
        <FeatureCard 
          icon={<Award className="h-10 w-10 text-primary-600" />}
          title="Grade Analysis"
          description="Understand your grade distribution and identify areas for improvement"
        />
      </div>
      
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg p-8 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="text-lg mb-6 opacity-90">
            Upload your RTU result PDF and gain valuable insights into your academic performance
          </p>
          <button 
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-primary-700 hover:bg-gray-100 btn"
          >
            Analyze Now
          </button>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card p-6 transition-transform duration-300 hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;