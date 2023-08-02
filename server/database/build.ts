/* eslint-disable no-console */
import config from '../config/environment';
import sequelize from './connection';

const buildModels = async () => sequelize.sync({ force: true });

if (config.nodeEnv !== 'test') buildModels();
export default buildModels;
