"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
var axios = require("axios");
var CryptoJS = require("crypto-js");
module.exports = {
  async create(ctx) {
    let entity;
    const onlySMS = true;
    if (onlySMS) {
      var randomCode = Math.floor(Math.random() * 1000000) + 100000;
      if (randomCode > 1000000) {
        randomCode = randomCode - 100000;
      }
      var message = `[Members-Here] 휴대전화 인증번호는 [${randomCode}] 입니다.`;
      ctx.request.body.authcode = randomCode;
      const uri = "ncp%3Asms%3Akr%3A260408054878%3Aprotectweb";
      const api =
        "https://sens.apigw.ntruss.com/sms/v2/services/" + uri + "/messages";
      const body = {
        type: "lms",
        countryCode: "82",
        from: "01050596778",
        subject: "",
        contentType: "COMM",
        content: message,
        messages: [
          { to: ctx.request.body.receiver.replace(/-/g, "").toString() },
        ],
      };
      const timestamp = Date.now().toString();
      const AccessKey = "Fbdu84gO44OGYOyXnaoY";
      const SecretKey = "MD5x8LuTJ5HP30Flrb7UGnMDyK9iaV9nlDTVfGGD";
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url2 = `/sms/v2/services/${uri}/messages`;

      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SecretKey);

      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(timestamp);
      hmac.update(newLine);
      hmac.update(AccessKey);

      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);

      const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": timestamp,
          "x-ncp-iam-access-key": AccessKey,
          "x-ncp-apigw-signature-v2": signature,
        },
      };
      axios
        .post(api, body, config)
        .then(() => {})
        .catch((messageerr) => {});
    }
    entity = await strapi.services["send-sms"].create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models["send-sms"] });
  },
  async sendSmsSettlement(ctx) {
    let entity;
    // const onlySMS = true;
    // if (onlySMS) {
    //   var randomCode = Math.floor(Math.random() * 1000000) + 100000;
    //   if (randomCode > 1000000) {
    //     randomCode = randomCode - 100000;
    //   }
    // }
    var message = ctx.request.body.content;
    // ctx.request.body.authcode = randomCode;
    const uri = "ncp%3Asms%3Akr%3A260408054878%3Aprotectweb";
    const api =
      "https://sens.apigw.ntruss.com/sms/v2/services/" + uri + "/messages";
    const body = {
      type: "lms",
      countryCode: "82",
      from: "01050596778",
      subject: "",
      contentType: "COMM",
      content: message,
      messages: [
        { to: ctx.request.body.phoneNumber.replace(/-/g, "").toString() },
      ],
    };
    const timestamp = Date.now().toString();
    const AccessKey = "Fbdu84gO44OGYOyXnaoY";
    const SecretKey = "MD5x8LuTJ5HP30Flrb7UGnMDyK9iaV9nlDTVfGGD";
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url2 = `/sms/v2/services/${uri}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SecretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(AccessKey);

    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    const config = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": AccessKey,
        "x-ncp-apigw-signature-v2": signature,
      },
    };
    axios
      .post(api, body, config)
      .then(() => {})
      .catch((messageerr) => {});

    entity = await strapi.services["send-sms"].create(ctx.request.body);
    ctx.send({ ok: true });
    // return sanitizeEntity(entity, { model: strapi.models["send-sms"] });
  },
  async emailDuplicate(ctx) {
    let check = false;
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ email: ctx.query.email });
    if (user) check = true;
    else check = false;
    return ctx.send({ duplicate: check });
  },
  async phoneDuplicate(ctx) {
    let check = false;
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ phone: ctx.query.phone });
    if (user) check = true;
    else check = false;
    return ctx.send({ duplicate: check });
  },
};
