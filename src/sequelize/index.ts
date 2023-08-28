import ExerciseInterface from './exercise';
import ProgramInterface from './program';
import SetInterface from './set';
import sequelizeInstance from './sequelize';

ProgramInterface.hasMany(SetInterface, {
    sourceKey: 'id',
    foreignKey: 'programId',
    as: 'sets',
});

ExerciseInterface.hasMany(SetInterface, {
    sourceKey: 'id',
    foreignKey: 'exerciseId',
    as: 'sets',
});

SetInterface.belongsTo(ProgramInterface, { targetKey: 'id' });
SetInterface.belongsTo(ExerciseInterface, { targetKey: 'id' });

export { ExerciseInterface, ProgramInterface, sequelizeInstance };
