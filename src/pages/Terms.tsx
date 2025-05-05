import React from 'react';
import { FileText, AlertCircle, Shield, Scale } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Acceptance of Terms</h2>
          </div>
          <p className="text-gray-600 mb-4">
            By accessing and using Result Analyzer, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms,
            you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Use License</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Permission is granted to temporarily download one copy of the materials (information or
            software) on Result Analyzer for personal, non-commercial transitory viewing only.
          </p>
          <p className="text-gray-600">This license shall automatically terminate if you violate any of these restrictions.</p>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Disclaimer</h2>
          </div>
          <p className="text-gray-600 mb-4">
            The materials on Result Analyzer are provided on an 'as is' basis. Result Analyzer makes
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties
            including, without limitation, implied warranties or conditions of merchantability, fitness
            for a particular purpose, or non-infringement of intellectual property or other violation
            of rights.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Scale className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Limitations</h2>
          </div>
          <p className="text-gray-600 mb-4">
            In no event shall Result Analyzer or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use the materials on Result Analyzer's website.
          </p>
        </section>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            For any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:aayushsharma4437@gmail.com" className="text-primary-600 hover:text-primary-700">
                aayushsharma4437@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;