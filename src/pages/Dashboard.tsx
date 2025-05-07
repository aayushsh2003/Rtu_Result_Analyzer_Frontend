import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../components/results/UserDetails';
import SubjectTable from '../components/results/SubjectTable';
import Charts from '../components/results/Charts';
import PerformanceMetrics from '../components/results/PerformanceMetrics';
import { ResultData } from '../services/api';
import { ArrowLeft, Download } from 'lucide-react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: '#2952a3',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subHeaderText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9
  },
  section: {
    margin: '15px 0',
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#1f2937',
    fontWeight: 'bold',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: 5
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#374151'
  },
  highlightText: {
    color: '#2952a3',
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    marginVertical: 15
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    padding: '10px 0',
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    padding: '0 5px'
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10
  },
  metricBox: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    marginBottom: 10
  },
  metricTitle: {
    fontSize: 10,
    color: '#6b7280'
  },
  metricValue: {
    fontSize: 16,
    color: '#2952a3',
    fontWeight: 'bold',
    marginTop: 5
  },
  chartSection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8
  },
  chartTitle: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: 'bold',
    marginBottom: 10
  },
  chartDescription: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 15
  },
  chartContainer: {
    marginVertical: 10,
    height: 200,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 6
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    marginVertical: 5
  },
  progressFill: {
    height: '100%',
    borderRadius: 6
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: 2
  },
  legendText: {
    fontSize: 8,
    color: '#6b7280'
  },
  performanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5
  },
  radarChart: {
    width: '100%',
    height: 200,
    position: 'relative'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 10,
    padding: '0 40px'
  },
  watermark: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    fontSize: 8,
    color: '#9ca3af',
    opacity: 0.5
  }
});

// PDF Document Component
const PDFDocument = ({ data }: { data: ResultData }) => {
  const calculateMetrics = () => {
    const totalSubjects = data.subjects.length;
    let totalMarks = 0;
    let highestMarks = 0;
    let lowestMarks = 100;
    let totalMidterm = 0;
    let totalEndterm = 0;
    
    data.subjects.forEach(subject => {
      const total = subject.midterm_marks + subject.endterm_marks;
      totalMarks += total;
      highestMarks = Math.max(highestMarks, total);
      lowestMarks = Math.min(lowestMarks, total);
      totalMidterm += subject.midterm_marks;
      totalEndterm += subject.endterm_marks;
    });
    
    return {
      average: (totalMarks / totalSubjects).toFixed(2),
      highest: highestMarks,
      lowest: lowestMarks,
      midtermAvg: (totalMidterm / totalSubjects).toFixed(2),
      endtermAvg: (totalEndterm / totalSubjects).toFixed(2),
      improvement: ((totalEndterm / totalSubjects) - (totalMidterm / totalSubjects)).toFixed(2)
    };
  };

  const metrics = calculateMetrics();

  // Calculate grade distribution percentages
  const getGradeDistribution = () => {
    const gradeCounts: Record<string, number> = {};
    data.subjects.forEach(subject => {
      gradeCounts[subject.grade] = (gradeCounts[subject.grade] || 0) + 1;
    });
    
    return Object.entries(gradeCounts).map(([grade, count]) => ({
      grade,
      percentage: (count / data.subjects.length) * 100,
      count
    }));
  };

  // Calculate performance trends
  const getPerformanceTrends = () => {
    return data.subjects.map(subject => ({
      code: subject.course_code,
      improvement: subject.endterm_marks - subject.midterm_marks,
      total: subject.midterm_marks + subject.endterm_marks
    })).sort((a, b) => b.improvement - a.improvement);
  };

  const gradeDistribution = getGradeDistribution();
  const performanceTrends = getPerformanceTrends();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>RTU Result Analysis Report</Text>
          <Text style={styles.subHeaderText}>Comprehensive Academic Performance Analysis</Text>
        </View>

        {/* Student Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <Text style={styles.text}>
            Name: <Text style={styles.highlightText}>{data.name}</Text>
          </Text>
          <Text style={styles.text}>
            Roll No: <Text style={styles.highlightText}>{data.roll_no}</Text>
          </Text>
          <Text style={styles.text}>
            Enrollment No: <Text style={styles.highlightText}>{data.enrollment_no}</Text>
          </Text>
          <Text style={styles.text}>
            College: <Text style={styles.highlightText}>{data.college}</Text>
          </Text>
        </View>

        {/* Performance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>Average Marks</Text>
              <Text style={styles.metricValue}>{metrics.average}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>Highest Marks</Text>
              <Text style={styles.metricValue}>{metrics.highest}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>Lowest Marks</Text>
              <Text style={styles.metricValue}>{metrics.lowest}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>Overall Improvement</Text>
              <Text style={[styles.metricValue, { color: Number(metrics.improvement) >= 0 ? '#059669' : '#DC2626' }]}>
                {Number(metrics.improvement) >= 0 ? '+' : ''}{metrics.improvement}%
              </Text>
            </View>
          </View>
        </View>

        {/* Term-wise Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Term-wise Performance</Text>
          <View style={styles.chartContainer}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>Midterm Average: {metrics.midtermAvg}%</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${metrics.midtermAvg}%`, backgroundColor: '#3366CC' }]} />
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>Endterm Average: {metrics.endtermAvg}%</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${metrics.endtermAvg}%`, backgroundColor: '#00A0B0' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Grade Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grade Distribution</Text>
          <View style={styles.chartContainer}>
            {gradeDistribution.map((item, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 10 }}>{item.grade}</Text>
                  <Text style={{ fontSize: 10 }}>{item.count} subjects ({item.percentage.toFixed(1)}%)</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${item.percentage}%`,
                        backgroundColor: item.grade.startsWith('A') ? '#059669' : 
                                      item.grade.startsWith('B') ? '#3366CC' :
                                      item.grade.startsWith('C') ? '#EAB308' :
                                      item.grade.startsWith('D') ? '#F97316' : '#DC2626'
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Improvement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject-wise Improvement</Text>
          <View style={styles.chartContainer}>
            {performanceTrends.map((subject, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                  <Text style={{ fontSize: 10 }}>{subject.code}</Text>
                  <Text style={{ fontSize: 10, color: subject.improvement >= 0 ? '#059669' : '#DC2626' }}>
                    {subject.improvement >= 0 ? '+' : ''}{subject.improvement}%
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${(subject.total / 2)}%`,
                        backgroundColor: subject.improvement >= 0 ? '#059669' : '#DC2626'
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Subject Details Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Subject Performance</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Course</Text>
              <Text style={styles.tableCell}>Code</Text>
              <Text style={styles.tableCell}>Midterm</Text>
              <Text style={styles.tableCell}>Endterm</Text>
              <Text style={styles.tableCell}>Grade</Text>
            </View>
            {data.subjects.map((subject, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{subject.course_title}</Text>
                <Text style={styles.tableCell}>{subject.course_code}</Text>
                <Text style={styles.tableCell}>{subject.midterm_marks}</Text>
                <Text style={styles.tableCell}>{subject.endterm_marks}</Text>
                <Text style={[styles.tableCell, { color: subject.grade.startsWith('A') ? '#059669' : '#DC2626' }]}>
                  {subject.grade}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.watermark}>Generated by RTU Result Analyzer</Text>
        <Text style={styles.footer}>
          Report generated on {new Date().toLocaleDateString()} | This is an automatically generated report
        </Text>
      </Page>
    </Document>
  );
};

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
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Upload
        </button>
        
        <PDFDownloadLink
          document={<PDFDocument data={resultData} />}
          fileName={`RTU_Result_Analysis_${resultData.roll_no}.pdf`}
          className="btn btn-primary flex items-center"
        >
          {({ loading }) => (
            <>
              <Download className="h-4 w-4 mr-2" />
              {loading ? 'Generating PDF...' : 'Download PDF Report'}
            </>
          )}
        </PDFDownloadLink>
      </div>
      
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
