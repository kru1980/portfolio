const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// сделаем проверку обеъкта req, заголовков, если есть jwt проверим его npm express-jwt (проверяет и вставляет объект req.user) и jwks-rsa
// я думал проверку будут делать jsonwebtoken пакетом, которым декодировали jwt Ошибся.
// c помощью данных модулей мы создадим новую функцию checkJWT

// exports.checkJWT = function(req, res, next) {
//   const isValid = false;
//   if (isValid) {
//     return next();
//   } else {
//     return res.status(401).send({
//       title: "Вы не вошли на сайт",
//       detail: "Для получения данных войдите на сайт"
//     });
//   }
// };

//auth0, clientID: "VH8prSsA7MmPx3AxbLGgoHgIbyHyQmU1" = audience,
//  domain: "dev-uejn1xhv.auth0.com" = issuer,
// вместо secretWorld вставляем ф-цию из jwks-rsa, которая извлекает с сервиса auth0 комплект jwks ключей.
// jwksUri -наши ключи на сервисе авторизации  "https://dev-uejn1xhv.auth0.com/.well-known/jwks.json"

// secret должен быть строкой в примере jwks-rsa - Express Example в поисковике смотрим как решить ошибку expressJwtSecret

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: "https://dev-uejn1xhv.auth0.com/.well-known/jwks.json"
  }),
  audience: "VH8prSsA7MmPx3AxbLGgoHgIbyHyQmU1",
  issuer: "https://dev-uejn1xhv.auth0.com/",
  algorithms: ["RS256"]
});
