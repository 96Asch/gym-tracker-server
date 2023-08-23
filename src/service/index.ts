import { exersiceDA } from '../data-access';
import { ExerciseService } from './create';

const exerciseService = new ExerciseService(exersiceDA);

export { exerciseService };
