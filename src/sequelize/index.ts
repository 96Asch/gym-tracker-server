import Exercise from './exercise';
import Program from './program';
import Set from './set';
import Muscle from './muscle';
import ProgramExercise from './programexercise';
import { checkConnection, transaction } from './sequelize';

const muscleBelongsToManyExercise = Muscle.belongsToMany(Exercise, {
    through: 'targets',
    foreignKey: 'exerciseId',
    timestamps: false,
});

const exerciseHasManyMuscle = Exercise.belongsToMany(Muscle, {
    through: 'targets',
    foreignKey: 'muscleId',
    timestamps: false,
});

const programExerciseBelongsToOneExercise = ProgramExercise.belongsTo(Exercise, {
    foreignKey: { name: 'exerciseId' },
    targetKey: 'id',
});

const exerciseHasOneProgramExercise = Exercise.hasOne(ProgramExercise, {
    foreignKey: 'exerciseId',
    sourceKey: 'id',
});

const programExerciseHasManySet = ProgramExercise.hasMany(Set, {
    sourceKey: 'id',
    foreignKey: { name: 'programExerciseId' },
    onDelete: 'CASCADE',
});

const setBelongsToProgramExercise = Set.belongsTo(ProgramExercise, {
    targetKey: 'id',
    foreignKey: { name: 'programExerciseId' },
    onDelete: 'CASCADE',
});

const programHasManyProgramExercise = Program.hasMany(ProgramExercise, {
    foreignKey: 'programId',
    sourceKey: 'id',
});

const programExerciseBelongsToOneProgram = ProgramExercise.belongsTo(Program, {
    foreignKey: { name: 'programId' },
    targetKey: 'id',
});

const associations = Object.freeze({
    exerciseHasManyMuscle,
    muscleBelongsToManyExercise,
    programExerciseBelongsToOneExercise,
    exerciseHasOneProgramExercise,
    programExerciseHasManySet,
    setBelongsToProgramExercise,
    programHasManyProgramExercise,
    programExerciseBelongsToOneProgram,
});

export default Object.freeze({
    Exercise,
    Program,
    ProgramExercise,
    Set,
    Muscle,
    checkConnection,
    transaction,
    associations,
});
