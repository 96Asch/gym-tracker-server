import {
    Model,
    DataTypes,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
} from 'sequelize';
import sequelize from '../../config/postgres';

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
            allowNull: false,
            primaryKey: true,
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
        sequelize,
        tableName: 'Exercises',
        timestamps: false,
    }
);

export default ExerciseInterface;
