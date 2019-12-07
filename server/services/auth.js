exports.checkJWT = function(req, res, next) {
  const isValid = false;
  if (isValid) {
    return next();
  } else {
    return res.status(401).send({
      title: "Вы не вошли на сайт",
      detail: "Для получения данных войдите на сайт"
    });
  }
};
