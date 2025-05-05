import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Subject } from '../../services/api';

interface SubjectTableProps {
  subjects: Subject[];
}

type SortField = 'course_title' | 'course_code' | 'midterm_marks' | 'endterm_marks' | 'grade';
type SortDirection = 'asc' | 'desc';

const SubjectTable: React.FC<SubjectTableProps> = ({ subjects }) => {
  const [sortField, setSortField] = useState<SortField>('course_title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortField === 'midterm_marks' || sortField === 'endterm_marks') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField] 
        : b[sortField] - a[sortField];
    } else {
      const aValue = a[sortField].toString().toLowerCase();
      const bValue = b[sortField].toString().toLowerCase();
      
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" />
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };
  
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-700 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-700 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-700 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };
  
  return (
    <div className="card h-full overflow-hidden">
      <div className="bg-gradient-to-r from-secondary-500 to-secondary-700 p-6 text-white">
        <h2 className="text-xl font-semibold mb-1">Subject Performance</h2>
        <p className="text-secondary-100 text-sm">Course-wise marks and grades</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('course_title')}>
                <div className="flex items-center">
                  <span>Course Title</span>
                  {getSortIcon('course_title')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('course_code')}>
                <div className="flex items-center">
                  <span>Course Code</span>
                  {getSortIcon('course_code')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('midterm_marks')}>
                <div className="flex items-center">
                  <span>Midterm</span>
                  {getSortIcon('midterm_marks')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('endterm_marks')}>
                <div className="flex items-center">
                  <span>Endterm</span>
                  {getSortIcon('endterm_marks')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('grade')}>
                <div className="flex items-center">
                  <span>Grade</span>
                  {getSortIcon('grade')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedSubjects.map((subject, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subject.course_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {subject.course_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {subject.midterm_marks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {subject.endterm_marks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                    {subject.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Total Subjects:</span> {subjects.length}
        </p>
      </div>
    </div>
  );
};

export default SubjectTable;