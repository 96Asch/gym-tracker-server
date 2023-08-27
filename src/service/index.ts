import { exersiceDA, programDA } from '../data-access';
import { ExerciseService } from './exercise';
import ProgramService from './program';

const exerciseService = new ExerciseService(exersiceDA);
const programService = new ProgramService(programDA);

export { exerciseService, programService };
