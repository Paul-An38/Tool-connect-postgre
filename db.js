// db.js
const { Pool } = require('pg');

// Cấu hình kết nối với PostgreSQL
const connectionString = `postgresql://nhadong:nhadong123.456.789@postgres.giaophanphucuong.org:9999/giaophanphucuongdb.prod`;

const pool = new Pool({
  //   user: 'nhadong',
  //   host: 'https://postgres.giaophanphucuong.org/',
  //   database: 'giaophanphucuongdb.prod',
  //   password: 'nhadong123.456.789',
  //   port: 9999,
});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'giaophanphucuongdb.prod',
  'readonly_user',
  'nhadong123',
  {
    port: 9999,
    host: 'postgres.giaophanphucuong.org',
    dialect: 'postgres', // Chỉ định sử dụng PostgreSQL
    logging: true,
  }
);

// Hàm kiểm tra kết nối
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Xuất các đối tượng và hàm
module.exports = {
  sequelize,
  testConnection,
};
