import ExerciseDataAccess from './exercise';
import ProgramDataAccess from './program';
import { SetDataAccess } from './set';

const exersiceDA = new ExerciseDataAccess();
const programDA = new ProgramDataAccess();
const setDA = new SetDataAccess();

export { exersiceDA, programDA, setDA };
