import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
const API_BASE_URL = import.meta.env.VITE_API_URL
// Types for the API responses
export interface StudentInfo {
  name: string;
  roll_no: string;
  enrollment_no: string;
  father_name: string;
  college: string;
  remarks: string;
}

export interface Subject {
  course_title: string;
  course_code: string;
  midterm_marks: number;
  endterm_marks: number;
  grade: string;
}

export interface ResultData extends StudentInfo {
  subjects: Subject[];
}

export const uploadPdf = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        throw new Error('No response received from server. Please check if the server is running.');
      }
    }
    throw error;
  }
};