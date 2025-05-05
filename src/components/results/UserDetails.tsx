import React from 'react';
import { User, School, Award } from 'lucide-react';
import { StudentInfo } from '../../services/api';

interface UserDetailsProps {
  studentInfo: StudentInfo;
}

const UserDetails: React.FC<UserDetailsProps> = ({ studentInfo }) => {
  const { name, roll_no, enrollment_no, father_name, college, remarks } = studentInfo;
  
  const getRemarkColor = (remark: string) => {
    switch (remark.toLowerCase()) {
      case 'pass':
        return 'text-green-600 bg-green-100';
      case 'fail':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };
  
  return (
    <div className="card h-full">
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">
        <h2 className="text-xl font-semibold mb-1">Student Information</h2>
        <p className="text-primary-100 text-sm">Academic profile details</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="bg-primary-100 p-2 rounded-full mr-4">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Student Name</h3>
            <p className="text-lg font-semibold text-gray-900">{name}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="bg-primary-100 p-2 rounded-full mr-4">
            <Award className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
            <p className="text-lg font-semibold text-gray-900">{roll_no}</p>
            <p className="text-sm text-gray-500">Enrollment: {enrollment_no}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="bg-primary-100 p-2 rounded-full mr-4">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Father's Name</h3>
            <p className="text-lg font-semibold text-gray-900">{father_name}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="bg-primary-100 p-2 rounded-full mr-4">
            <School className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">College Name</h3>
            <p className="text-lg font-semibold text-gray-900">{college}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Remarks</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRemarkColor(remarks)}`}>
            {remarks}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;