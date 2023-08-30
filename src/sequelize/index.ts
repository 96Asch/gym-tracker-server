import Exercise from './exercise';
import Program from './program';
import Set from './set';
import Muscle from './muscle';
import { checkConnection } from './sequelize';

const programHasManySet = Program.hasMany(Set, {
    sourceKey: 'id',
    foreignKey: 'programId',
});

const exHasManySet = Exercise.hasMany(Set, {
    sourceKey: 'id',
    foreignKey: 'exerciseId',
});

const setBelongsToProgram = Set.belongsTo(Program, {
    targetKey: 'id',
    foreignKey: 'programId',
});
const setBelongsToExercise = Set.belongsTo(Exercise, {
    targetKey: 'id',
    foreignKey: 'exerciseId',
});

const exerciseHasManyMuscle = Exercise.belongsToMany(Muscle, {
    through: 'targetedMuscles',
    foreignKey: 'muscleId',
    timestamps: false,
});
const muscleBelongsToManyExercise = Muscle.belongsToMany(Exercise, {
    through: 'targetedMuscles',
    foreignKey: 'exerciseId',
    timestamps: false,
});

const associations = Object.freeze({
    exHasManySet,
    programHasManySet,
    setBelongsToExercise,
    setBelongsToProgram,
    exerciseHasManyMuscle,
    muscleBelongsToManyExercise,
});

export default Object.freeze({
    Exercise,
    Program,
    Set,
    Muscle,
    checkConnection,
    associations,
});
