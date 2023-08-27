import ExerciseDataAccess from './exercise';
import ProgramDataAccess from './program';

const exerciseFilterKeys = ['ids', 'targets'];

const exersiceDA = new ExerciseDataAccess(exerciseFilterKeys);
const programDA = new ProgramDataAccess();

export { exersiceDA, programDA };
