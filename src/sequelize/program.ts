import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyAddAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyRemoveAssociationMixin,
    NonAttribute,
} from 'sequelize';
import { sequelizeInstance } from './sequelize';
import ProgramExercise from './programexercise';
import { HasManySetAssociationsMixin } from 'sequelize';

class Program extends Model<InferAttributes<Program>, InferCreationAttributes<Program>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare endDate: Date;

    declare createProgramExercise: HasManyCreateAssociationMixin<ProgramExercise>;
    declare addProgramExercise: HasManyAddAssociationMixin<ProgramExercise, number>;
    declare addProgramExercises: HasManyAddAssociationsMixin<ProgramExercise, number[]>;
    declare setProgramExercises: HasManySetAssociationsMixin<ProgramExercise, number[]>;
    declare removeProgramExercise: HasManyRemoveAssociationMixin<ProgramExercise, number>;

    declare programExercises?: NonAttribute<ProgramExercise>;
}

Program.init(
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
    {
        tableName: 'program',
        sequelize: sequelizeInstance,
        updatedAt: false,
        createdAt: false,
    }
);

export default Program;
