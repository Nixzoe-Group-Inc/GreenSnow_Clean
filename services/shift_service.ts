import api from './api';

interface ShiftData {
  name: string;
  employer: string;
  shift_type: string;
  date: string;
  start_time: string;
  hourly_rate: number;
  number_of_hours: number;
  number_of_openings: number;
}

export const createShift = async (shiftData: ShiftData) => {
  try {
    const response = await api.post('/shifts/create/shift/', shiftData);
    return response.data;
  } catch (error) {
    throw error;
  }
};