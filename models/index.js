const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
    title: Sequelize.STRING,
    slug: {
        type: Sequelize.STRING,
        unique: true
    },
    content: Sequelize.STRING,
    status: Sequelize.STRING
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: Sequelize.STRING

})

module.exports = {
  db
}
