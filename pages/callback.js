import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import auth0Client from "../services/auth0";
import { withRouter } from "next/router";

class Callback extends React.Component {
  // После удачного/неудачного входа через сервис auth0, сервис отправляет нас на эту страницу, но прежде чем страница отрендериться в componentDidMount включиться обработчик auth0Client.handleAuthentication(). Это обещание, если токен годен то токен будет передан в сессию сервиса auth0 и произойдет редирект на /

  //  handleAuthentication() {
  // return new Promise((resolve, reject) => {
  //     this.auth0.parseHash((err, authResult) => {
  //       if (authResult && authResult.accessToken && authResult.idToken) {
  //         this.setSession(authResult);
  //         resolve();
  //       } else if (err) {
  //         reject(err);
  //         console.log(err);
  //       }
  //     });
  //   });
  // }

  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.router.push("/");
  }

  render() {
    return (
      <BaseLayout title="Callback">
        <BasePage className="about-page">
          <div>
            <p>Verifying login data ...</p>
          </div>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Callback);
