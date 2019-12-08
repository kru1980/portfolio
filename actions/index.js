import axios from "axios";
import Cookies from "js-cookie";
import {getCookieFromReq} from "../helpers/utils";

// Выносим в данный файл всю логику приложения, получения данных, чтобы не лепить axios везде

const setAuthHeader = (req) => {

    // чтобы логику не дублировать fn serverAuth из auth0 вынесем в helpers
  const token = req? getCookieFromReq(req, "jwt"): Cookies.getJSON("jwt");

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }
  return undefined;
};


export const getSecretData = async (req) => {
  // чтобы запрашитвать секр данные на странице secret из getInitialProps необходимо указать полный маршрут для axios
  // автоматом получим ошибку тк setAuthHeader() берет jwt из куков, которых на сервере нет
// const url = req ? "http://localhost:3000/api/v1/secret" : "/api/v1/secret"
// больше не актуально
const url = "http://localhost:3000/api/v1/secret"

  return await axios
    .get(url, setAuthHeader(req))
    .then(response => {
      return response.data;
    });
};
