import React from "react";

import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../layouts/BasePage";

export default function(Component) {
  return class withAuth extends React.Component {
    // TODO Теряются данные в secret странице, которые вызваны методом getInitialProps, тк метод getInitialProps идет в обход hoc поэтому:

    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) && Component.getInitialProps(args);

      return { ...pageProps };
    }

    renderProtectedPage() {
      const { isAuthenticated } = this.props.auth;

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
      } else {
        return <Component {...this.props} />;
      }
    }

    render() {
      return this.renderProtectedPage();
    }
  };
}
