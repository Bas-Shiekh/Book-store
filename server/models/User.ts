import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue:
      'https://us.123rf.com/450wm/anwarsikumbang/anwarsikumbang1602/anwarsikumbang160200119/52015141-geek-nerd-guy-cartoon-character-theme-vector-illustration.jpg?ver=6',
  },
});

export default User;
