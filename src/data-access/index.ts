import ExerciseDataAccess from './exercise';
import MuscleDataAccess from './muscle';
import ProgramDataAccess from './program';
import { SetDataAccess } from './set';

const exersiceDA = new ExerciseDataAccess();
const programDA = new ProgramDataAccess();
const setDA = new SetDataAccess();
const muscleDA = new MuscleDataAccess();

export { exersiceDA, programDA, setDA, muscleDA };
