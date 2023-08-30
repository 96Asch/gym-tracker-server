import {
    BelongsToManyGetAssociationsMixin,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import Exercise from './exercise';
import { sequelizeInstance } from './sequelize';

class Muscle extends Model<InferAttributes<Muscle>, InferCreationAttributes<Muscle>> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare getExercises: BelongsToManyGetAssociationsMixin<Exercise>;

    declare exercises: NonAttribute<Exercise[]>;
}

Muscle.init(
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
            unique: true,
        },
    },
    { tableName: 'muscles', sequelize: sequelizeInstance, timestamps: false }
);

export default Muscle;
