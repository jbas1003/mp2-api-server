import { Sequelize } from "sequelize";

export const newSequelize = Sequelize
export const taskSupportDb = new Sequelize('taskSupportdb', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});
