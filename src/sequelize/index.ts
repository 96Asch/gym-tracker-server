import Exercise from './exercise';
import Program from './program';
import Set from './set';
import { checkConnection } from './sequelize';

Program.hasMany(Set, {
    sourceKey: 'id',
    as: 'programSets',
});

Exercise.hasMany(Set, {
    sourceKey: 'id',
    as: 'exerciseSets',
});

Set.belongsTo(Program, { targetKey: 'id' });
Set.belongsTo(Exercise, { targetKey: 'id' });

export default Object.freeze({
    Exercise,
    Program,
    Set,
    checkConnection,
});
