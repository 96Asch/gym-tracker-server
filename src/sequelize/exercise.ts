import {
    Model,
    DataTypes,
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    NonAttribute,
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyAddAssociationsMixin,
} from 'sequelize';
import { sequelizeInstance } from './sequelize';
import { Muscle } from '../model';
import { BelongsToManySetAssociationsMixin } from 'sequelize';

class Exercise extends Model<
    InferAttributes<Exercise>,
    InferCreationAttributes<Exercise>
> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare addMuscle: BelongsToManyAddAssociationMixin<Muscle, number>;
    declare addMuscles: BelongsToManyAddAssociationsMixin<Muscle, number[]>;
    declare getMuscles: BelongsToManyGetAssociationsMixin<Muscle>;
    declare setMuscles: BelongsToManySetAssociationsMixin<Muscle, number[]>;
    declare countMuscles: BelongsToManyCountAssociationsMixin;
    declare removeMuscle: BelongsToManyRemoveAssociationMixin<Muscle, number>;

    declare muscles: NonAttribute<Muscle[]>;
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
    },
    {
        tableName: 'exercises',
        sequelize: sequelizeInstance,
        timestamps: false,
    }
);

export default Exercise;
