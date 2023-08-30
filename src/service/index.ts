import { exersiceDA, programDA, setDA } from '../data-access';
import ExerciseService from './exercise';
import ProgramService from './program';
import SetService from './set';

const exerciseService = new ExerciseService(exersiceDA);
const programService = new ProgramService(programDA);
const setService = new SetService(setDA);

export { exerciseService, programService, setService };
