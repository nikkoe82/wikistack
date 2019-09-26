const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false

  },
  status: Sequelize.ENUM('open', 'close')
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    //defaultValue: set type to this if it's not included in User.create()
    allowNull: false,
    validate: {
      isEmail: true
    }
  }

})
Page.beforeValidate((userInstance, optionsObject) => {
  userInstance.slug = userInstance.title.replace(/\s+/g, '_').replace(/\W/g, '')
})

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  Page,
  User
}
