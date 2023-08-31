import {
    exersiceDA,
    muscleDA,
    programDA,
    programExerciseDA,
    setDA,
} from '../data-access';
import ExerciseService from './exercise';
import MuscleService from './muscle';
import ProgramService from './program';
import ProgramExerciseService from './programexercise';
import SetService from './set';

const exerciseService = new ExerciseService(exersiceDA);
const programService = new ProgramService(programDA);
const setService = new SetService(setDA);
const muscleService = new MuscleService(muscleDA);
const programExerciseService = new ProgramExerciseService(programExerciseDA);

export {
    exerciseService,
    programService,
    setService,
    muscleService,
    programExerciseService,
};
