'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('exercises', {
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
        await queryInterface.createTable('programs', {
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
        await queryInterface.createTable('sets', {
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
            programId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Programs', key: 'id' },
            },
            exerciseId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Exercises', key: 'id' },
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
