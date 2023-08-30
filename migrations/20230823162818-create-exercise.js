'use strict';

const sequelize = require('sequelize');

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
        await queryInterface.createTable('Sets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            repetitions: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            weightInKg: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            double: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Exercises');
        await queryInterface.dropTable('Programs');
        await queryInterface.dropTable('Sets');
    },
};
