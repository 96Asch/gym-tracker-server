import { DataTypes } from 'sequelize';
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import sequelize from './sequelize';

class ProgramInterface extends Model<
    InferAttributes<ProgramInterface>,
    InferCreationAttributes<ProgramInterface>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare endDate: Date;
}

console.log('Program Init');

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
    { sequelize: sequelize, updatedAt: false }
);

console.log('Created Program');

export default ProgramInterface;
