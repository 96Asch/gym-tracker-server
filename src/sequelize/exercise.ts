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

console.log('Exercise Init');

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
        tableName: 'Exercises',
        timestamps: false,
    }
);

console.log('Created Exercise');

export default ExerciseInterface;
