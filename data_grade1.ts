
import { Grade } from './types';
import { hisLessonsB1, hisLessonsB2, hisLessonsB3, hisLessonsB4 } from './data_grade1_historia';
import { geoLessonsB1, geoLessonsB2, geoLessonsB3, geoLessonsB4 } from './data_grade1_geografia';
import { phiLessonsB1, phiLessonsB2, phiLessonsB3, phiLessonsB4 } from './data_grade1_filosofia';
import { socLessonsB1, socLessonsB2, socLessonsB3, socLessonsB4 } from './data_grade1_sociologia';

export const grade1Data: Grade = {
  id: 1,
  title: "1ª Série",
  description: "Ciências Humanas e Sociais Aplicadas",
  color: "bg-blue-600",
  bimesters: [
    { 
      id: 1, 
      title: "1º Bimestre", 
      lessons: [...hisLessonsB1, ...geoLessonsB1, ...phiLessonsB1, ...socLessonsB1] 
    },
    { 
      id: 2, 
      title: "2º Bimestre", 
      lessons: [...hisLessonsB2, ...geoLessonsB2, ...phiLessonsB2, ...socLessonsB2] 
    },
    { 
      id: 3, 
      title: "3º Bimestre", 
      lessons: [...hisLessonsB3, ...geoLessonsB3, ...phiLessonsB3, ...socLessonsB3] 
    },
    { 
      id: 4, 
      title: "4º Bimestre", 
      lessons: [...hisLessonsB4, ...geoLessonsB4, ...phiLessonsB4, ...socLessonsB4] 
    }
  ]
};
