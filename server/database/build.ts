import config from '../config/environment';
import { sequelize } from '../models';

const buildModels = async () => sequelize.sync({ force: true });

if (config.nodeEnv !== 'test') buildModels();
export default buildModels;
