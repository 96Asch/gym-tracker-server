import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    BelongsToSetAssociationMixin,
    BelongsTo,
} from 'sequelize';
import { sequelizeInstance } from './sequelize';
import Exercise from './exercise';
import Program from './program';
import Set from './set';

class ProgramExercise extends Model<
    InferAttributes<ProgramExercise>,
    InferCreationAttributes<ProgramExercise>
> {
    declare id: CreationOptional<number>;
    declare order: number;

    declare addSet: HasManyAddAssociationMixin<Set, number>;
    declare addSets: HasManyAddAssociationsMixin<Set, number[]>;

    declare setExercise: BelongsToSetAssociationMixin<Exercise, number>;
    declare setProgram: BelongsToSetAssociationMixin<Program, number>;

    declare sets?: NonAttribute<Set>;
    declare exercise?: NonAttribute<Exercise>;
    declare program?: NonAttribute<Program>;
}

ProgramExercise.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        order: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'programExercise',
        sequelize: sequelizeInstance,
        timestamps: false,
    }
);

export default ProgramExercise;
