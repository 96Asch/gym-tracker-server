import { exersiceDA, muscleDA, programDA, setDA } from '../data-access';
import ExerciseService from './exercise';
import MuscleService from './muscle';
import ProgramService from './program';
import SetService from './set';

const exerciseService = new ExerciseService(exersiceDA);
const programService = new ProgramService(programDA);
const setService = new SetService(setDA);
const muscleService = new MuscleService(muscleDA);

export { exerciseService, programService, setService, muscleService };
