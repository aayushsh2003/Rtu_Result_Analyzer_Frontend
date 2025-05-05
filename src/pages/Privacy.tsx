import React from 'react';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Data Protection</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We take the protection of your personal and academic data seriously. All information uploaded
            to our platform is encrypted and not stored. We implement industry-standard security
            measures to prevent unauthorized access, disclosure, or misuse of your information.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Lock className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Information Collection</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We collect only the necessary information required to analyze your academic results. This includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
            <li>Basic personal information (name, enrollment number)</li>
            <li>Academic records and results</li>
            <li>Performance metrics and analysis data</li>
          </ul>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Eye className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Data Usage</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Your data is used exclusively for:
          </p>
          <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
            <li>Generating performance analysis and insights</li>
            <li>Improving our analysis algorithms</li>
            <li>Providing personalized academic recommendations</li>
          </ul>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <UserCheck className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
          </div>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Opt-out of data collection</li>
            <li>Request data corrections</li>
          </ul>
        </section>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            For any privacy-related queries, please contact us at{' '}
            <a href="mailto:aayushsharma4437@gmail.com" className="text-primary-600 hover:text-primary-700">
              aayushsharma4437@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;