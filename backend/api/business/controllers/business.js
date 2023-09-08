"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    const code = Math.random().toString(36).substr(2, 11);
    const data = {
      ...ctx.request.body,
      code: code,
    };
    entity = await strapi.services.business.create(data);
    return sanitizeEntity(entity, { model: strapi.models.business });
  },
  async businessNameCheck(ctx) {
    let businessData = await strapi.services.business.find();
    if (
      businessData.filter(
        (x) => x.name.toLowerCase() === ctx.params._input.name.toLowerCase()
      ).length === 0
    ) {
      ctx.send({ ok: true });
    } else {
      ctx.send({ ok: false });
    }
    // let data = {
    //   name: ctx.query.name,
    // };
    // entity = await strapi.services.business.find(data);
    // return sanitizeEntity(entity, { model: strapi.models.business });
  },
};
