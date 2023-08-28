import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from './sequelize';
import ProgramInterface from './program';
import ExerciseInterface from './exercise';

class SetInterface extends Model<
    InferAttributes<SetInterface>,
    InferCreationAttributes<SetInterface>
> {
    declare id: CreationOptional<number>;
    declare repetitions: number;
    declare programId: ForeignKey<ProgramInterface['id']>;
    declare exerciseId: ForeignKey<ExerciseInterface['id']>;
    declare weightInKg: number;
    declare double: boolean;
}

SetInterface.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        repetitions: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        programId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: { model: 'Programs', key: 'id' },
        },
        exerciseId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: { model: 'Exercises', key: 'id' },
        },
        weightInKg: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        double: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: 'Sets',
        createdAt: false,
        updatedAt: false,
    }
);

export default SetInterface;
