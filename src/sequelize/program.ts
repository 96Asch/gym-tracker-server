import { DataTypes } from 'sequelize';
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import sequelize from './sequelize';
import SetInterface from './set';

class ProgramInterface extends Model<
    InferAttributes<ProgramInterface>,
    InferCreationAttributes<ProgramInterface>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare endDate: Date;
}

ProgramInterface.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    { sequelize: sequelize, tableName: 'programs', updatedAt: false, createdAt: false }
);

export default ProgramInterface;
