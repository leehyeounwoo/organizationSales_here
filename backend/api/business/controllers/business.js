'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx){
    let entity;
    const code =Math.random().toString(36).substr(2,11)
    const data = {
        ...ctx.request.body,
        code: code
    }
    entity = await strapi.services.business.create(data);
    return sanitizeEntity(entity, { model: strapi.models.business });
  }
};
