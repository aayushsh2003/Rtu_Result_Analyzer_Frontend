import React from 'react';
import { Subject } from '../../services/api';
import { TrendingUp, TrendingDown, Medal, AlertTriangle, Target, BookOpen, Percent, Award } from 'lucide-react';

interface PerformanceMetricsProps {
  subjects: Subject[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ subjects }) => {
  const calculateMetrics = () => {
    const totalSubjects = subjects.length;
    let totalMarks = 0;
    let highestMarks = 0;
    let lowestMarks = 100;
    let totalCredits = 0;
    let weightedSum = 0;
    const gradePoints: Record<string, number> = {
      'A++': 10,        // xi ≥ 90
      'A+': 9.0,        // 85 ≤ xi < 90
      'A': 8.5,         // 80 ≤ xi < 85
      'B+': 8.0,        // 75 ≤ xi < 80
      'B': 7.5,         // 70 ≤ xi < 75
      'C+': 7.0,        // 65 ≤ xi < 70
      'C': 6.5,         // 60 ≤ xi < 65
      'D+': 6.0,        // 55 ≤ xi < 60
      'D': 5.5,         // 50 ≤ xi < 55
      'F': 0            // xi < 50
    };
    
    
    const gradeDistribution: Record<string, number> = {};
    
    subjects.forEach(subject => {
      const totalSubjectMarks = subject.midterm_marks + subject.endterm_marks;
      totalMarks += totalSubjectMarks;
      
      highestMarks = Math.max(highestMarks, totalSubjectMarks);
      lowestMarks = Math.min(lowestMarks, totalSubjectMarks);
      
      gradeDistribution[subject.grade] = (gradeDistribution[subject.grade] || 0) + 1;
      
      // Assuming each subject has 4 credits for SGPA calculation
      const credits = 4;
      totalCredits += credits;
      weightedSum += credits * (gradePoints[subject.grade] || 0);
    });
    
    const averageMarks = totalMarks / totalSubjects;
    const sgpa = weightedSum / totalCredits;
    
    // Calculate pass percentage
    const passedSubjects = subjects.filter(subject => subject.grade !== 'F').length;
    const passPercentage = (passedSubjects / totalSubjects) * 100;
    
    // Find subjects needing attention (below average performance)
    const subjectsNeedingAttention = subjects.filter(
      subject => (subject.midterm_marks + subject.endterm_marks) < averageMarks
    );
    
    // Calculate performance trend
    const midtermAvg = subjects.reduce((acc, subj) => acc + subj.midterm_marks, 0) / totalSubjects;
    const endtermAvg = subjects.reduce((acc, subj) => acc + subj.endterm_marks, 0) / totalSubjects;
    const performanceTrend = endtermAvg - midtermAvg;
    
    return {
      averageMarks: averageMarks.toFixed(2),
      highestMarks,
      lowestMarks,
      gradeDistribution,
      subjectsNeedingAttention,
      sgpa: sgpa.toFixed(2),
      passPercentage: passPercentage.toFixed(1),
      performanceTrend: performanceTrend.toFixed(2)
    };
  };
  
  const metrics = calculateMetrics();
  
  return (
    <div className="card mb-8">
      <div className="bg-gradient-to-r from-accent-500 to-accent-700 p-6 text-white">
        <h2 className="text-xl font-semibold mb-1">Performance Overview</h2>
        <p className="text-accent-100 text-sm">Key metrics and insights from your results</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">SGPA</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.sgpa}</p>
          </div> */}
          
          {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Pass Percentage</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.passPercentage}%</p>
          </div> */}

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <Medal className="h-5 w-5 text-yellow-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Highest Marks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.highestMarks}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Lowest Marks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.lowestMarks}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <Target className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Average Marks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.averageMarks}</p>
          </div>
          
          {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Performance Trend</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Number(metrics.performanceTrend) > 0 ? '+' : ''}{metrics.performanceTrend}
            </p>
          </div> */}
          
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Subjects Needing Attention</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metrics.subjectsNeedingAttention.length}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <BookOpen className="h-5 w-5 text-teal-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-600">Total Subjects</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Subjects Needing Attention</h3>
          <div className="space-y-3">
            {metrics.subjectsNeedingAttention.map((subject, index) => (
              <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-medium text-orange-800">{subject.course_title}</h4>
                <div className="mt-2 flex flex-wrap gap-4">
                  <span className="text-sm text-orange-600">
                    Midterm: {subject.midterm_marks}
                  </span>
                  <span className="text-sm text-orange-600">
                    Endterm: {subject.endterm_marks}
                  </span>
                  <span className="text-sm text-orange-600">
                    Total: {subject.midterm_marks + subject.endterm_marks}
                  </span>
                  <span className="text-sm font-medium text-orange-700">
                    Grade: {subject.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;