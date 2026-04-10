
import { Subject } from './types';

export const subjectsInfo: Record<Subject, { name: string; color: string; icon: string }> = {
  geografia: { name: 'Geografia', color: 'bg-emerald-500', icon: '🌍' },
  historia: { name: 'História', color: 'bg-amber-600', icon: '📜' },
  filosofia: { name: 'Filosofia', color: 'bg-indigo-600', icon: '🧠' },
  sociologia: { name: 'Sociologia', color: 'bg-rose-500', icon: '👥' }
};
