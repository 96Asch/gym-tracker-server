'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Exercises', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            target: {
                type: Sequelize.STRING,
            },
        });
        await queryInterface.createTable('Programs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            endDate: {
                type: Sequelize.DATEONLY,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Exercises');
        await queryInterface.dropTable('Programs');
    },
};
