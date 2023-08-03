import Book from './Book';
import User from './User';
import sequelize from '../database/connection';

User.hasMany(Book, { foreignKey: 'user_id', sourceKey: 'id' });
Book.belongsTo(User, { foreignKey: 'user_id' });

export { User, Book, sequelize };
