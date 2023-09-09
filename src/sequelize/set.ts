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
            type: DataTypes.DOUBLE,
            defaultValue: 0,
        },
        double: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: 'set',
        sequelize: sequelizeInstance,
        updatedAt: false,
    }
);

export default Set;
