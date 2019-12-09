import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

import withAuth from "../components/hoc/withAuth";
import { getSecretData, getSecretDataServer } from "../actions";

// import { getSecretData, getSecretDataServer } from "../actions";

class Secret extends React.Component {
  static async getInitialProps({ req }) {
    // не получиться получить секретные данные через axios, необходима проверка среды, запрос идет с сервера или клиента (особенность axios - нужно полный путь указывать) Проверку делаем на стр secret
    // Не разобрался!! зачем componentDidMount и getInitialProps
    const anotherSecretData = await getSecretData(req);
    // console.log("anotherSecretData", anotherSecretData);

    return { anotherSecretData };
  }

  state = {
    secretData: []
  };

  async componentDidMount() {
    const secretData = await getSecretData();

    this.setState({
      secretData
    });
  }

  displaySecretData() {
    const { secretData } = this.state;

    if (secretData && secretData.length > 0) {
      return secretData.map((data, index) => {
        return (
          <div key={index}>
            <p> {data.title}</p>
            <p> {data.descriptions}</p>
          </div>
        );
      });
    }

    return null;
  }

  render() {
    const { superSecretValue } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1> I am Secret Page </h1>
          <p> Secret Content Here </p>
          <h2> {superSecretValue} </h2>
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}
// при обновлении компанента withAuth, когда в него передается роль юзера, не забываем withAuth(Secret) заменить на withAuth()(Secret);
export default withAuth()(Secret);
