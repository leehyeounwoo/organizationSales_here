"use strict";
const { sanitizeEntity } = require("strapi-utils");
const fs = require("fs");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    const data = {
      ...ctx.request.body,
    };
    entity = await strapi.services.team.create(data);
    const teamAPIs = await await strapi.services.team.find();
    const ApiList = [];
    teamAPIs.forEach((api) => {
      ApiList.push({
        id: api.id,
        title: api.title,
        businessID: api.businessID,
        useYn: api.useYn,
      });
    });
    fs.writeFile(
      `./public/team_data_api.json`,
      JSON.stringify(ApiList),
      (err) => {
        if (err === null) {
        } else if (err) {
          console.log("fail:" + err);
        }
      }
    );
    return sanitizeEntity(entity, { model: strapi.models.team });
  },
};
