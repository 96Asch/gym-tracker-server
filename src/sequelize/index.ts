import Exercise from './exercise';
import Program from './program';
import Set from './set';
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

const associations = Object.freeze({
    exHasManySet,
    programHasManySet,
    setBelongsToExercise,
    setBelongsToProgram,
});

export default Object.freeze({
    Exercise,
    Program,
    Set,
    checkConnection,
    associations,
});
