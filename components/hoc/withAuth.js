import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../layouts/BasePage";

const namespace = "http://localhost:3000/";

export default role => Component =>
  class withAuth extends React.Component {
    // TODO Теряются данные в secret странице, которые вызваны методом getInitialProps, тк метод getInitialProps идет в обход hoc поэтому:

    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) && Component.getInitialProps(args);

      return { ...pageProps };
    }

    renderProtectedPage() {
      const { isAuthenticated, user } = this.props.auth;

      // Добавляем роли юзера
      const userRole = user && user[`${namespace}role`];
      let isAuthorized = false;

      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      if (!isAuthenticated) {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              <h1>
                {" "}
                You are not authenticated (аутентифицированы, те не зашли через
                логин). Please Login to access this page.{" "}
              </h1>
            </BasePage>
          </BaseLayout>
        );
      } else if (!isAuthorized) {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              <h1>
                {" "}
                Вы не авторизованы. У вас нет прав посещения данной страницы
              </h1>
            </BasePage>
          </BaseLayout>
        );
      } else {
        return <Component {...this.props} />;
      }
    }

    render() {
      return this.renderProtectedPage();
    }
  };
