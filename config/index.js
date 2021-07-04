const config = {
  mysql: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.password,
    database: process.env.database,
  },
  uploadsFolder: process.env.UPLOAD_FOLDER || 'public/uploads/',
  uploadsAccess: process.env.UPLOAD_ACCESS || '/uploads/',
};

module.exports = config;