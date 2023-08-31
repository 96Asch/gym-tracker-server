import {
    CreationOptional,
    DataTypes,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';

import { sequelizeInstance } from './sequelize';
import Program from './program';
import Exercise from './exercise';

class Set extends Model<InferAttributes<Set>, InferCreationAttributes<Set>> {
    declare id: CreationOptional<number>;
    declare repetitions: number;
    declare weightInKg: number;
    declare double: boolean;
    declare performedOn?: Date;

    declare setProgram: HasOneSetAssociationMixin<Program, number>;
    declare getProgram: HasOneGetAssociationMixin<Program>;
    declare setExercise: HasOneSetAssociationMixin<Exercise, number>;
    declare getExercise: HasOneGetAssociationMixin<Exercise>;

    declare exercise?: NonAttribute<Exercise>;
    declare program?: NonAttribute<Program>;
}

Set.init(
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
        performedOn: {
            allowNull: true,
            type: DataTypes.DATEONLY,
        },
    },
    {
        tableName: 'set',
        sequelize: sequelizeInstance,
        timestamps: false,
    }
);

export default Set;
