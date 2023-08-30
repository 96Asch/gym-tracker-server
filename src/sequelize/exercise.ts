import {
    Model,
    DataTypes,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from 'sequelize';
import { sequelizeInstance } from './sequelize';

class Exercise extends Model<
    InferAttributes<Exercise>,
    InferCreationAttributes<Exercise>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare target: string;
}

Exercise.init(
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
        target: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: 'Exercises',
        timestamps: false,
    }
);

export default Exercise;
