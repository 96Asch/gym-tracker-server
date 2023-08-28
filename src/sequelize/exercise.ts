import {
    Model,
    DataTypes,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from 'sequelize';
import sequelize from './sequelize';
import SetInterface from './set';

class ExerciseInterface extends Model<
    InferAttributes<ExerciseInterface>,
    InferCreationAttributes<ExerciseInterface>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare target: string;
}

ExerciseInterface.init(
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
        sequelize: sequelize,
        tableName: 'exercises',
        timestamps: false,
    }
);

export default ExerciseInterface;
