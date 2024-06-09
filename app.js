const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const db = require('./db');
const routes = require('./routes');
app.use('/', routes);

// Lắng nghe trên cổng đã chỉ định
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

db.testConnection();

// // Đồng bộ cơ sở dữ liệu (nếu cần)
// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log('Database & tables synchronized!');
//   })
//   .catch((err) => console.error('Error syncing database:', err));
