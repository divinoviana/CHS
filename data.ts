
import { Grade } from './types';
import { grade1Data } from './data_grade1';
import { grade2Data } from './data_grade2';
import { grade3Data } from './data_grade3';

export * from './data_subjects';
export * from './data_admin';

export const curriculumData: Grade[] = [
  grade1Data,
  grade2Data,
  grade3Data
];
