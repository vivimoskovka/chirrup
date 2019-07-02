
// messages-model.js - A Sequelize model. (Can be re-generated.)
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const merge = require('lodash.merge');
// !<DEFAULT> code: sequelize_schema
const sequelizeSchema = require('../services/messages/messages.sequelize');
// !end
// !code: sequelize_imports // !end
// !code: sequelize_init // !end

let moduleExports = function (app) {
  let sequelizeClient = app.get('sequelizeClient');
  // !code: sequelize_func_init // !end

  const messages = sequelizeClient.define('messages',
    // !<DEFAULT> code: sequelize_model
    sequelizeSchema,
    // !end
    merge(
      // !<DEFAULT> code: sequelize_options
      {
        hooks: {
          beforeCount(options) {
            options.raw = true;
          },
        },
      },
      // !end
      // !code: sequelize_define // !end
    )
  );

  // eslint-disable-next-line no-unused-vars
  messages.associate = function (models) {
    // Define associations here for foreign keys
    //   - userId
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // !code: sequelize_associations
    messages.belongsTo(models.users);
    // !end
  };

  // !code: sequelize_func_return // !end
  return messages;
};
// !code: sequelize_more // !end

// !code: sequelize_exports // !end
module.exports = moduleExports;

// !code: sequelize_funcs // !end
// !code: sequelize_end // !end
