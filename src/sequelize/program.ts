import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyRemoveAssociationMixin,
    NonAttribute,
} from 'sequelize';
import Set from './set';
import { sequelizeInstance } from './sequelize';

class Program extends Model<InferAttributes<Program>, InferCreationAttributes<Program>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare endDate: Date;

    declare addSet: HasManyAddAssociationMixin<Set, number>;
    declare getSets: HasManyGetAssociationsMixin<Set>;
    declare countSets: HasManyCountAssociationsMixin;
    declare removeSet: HasManyRemoveAssociationMixin<Set, number>;

    declare sets: NonAttribute<Set[]>;
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
