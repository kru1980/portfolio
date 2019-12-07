import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

import withAuth from "../components/hoc/withAuth";
import axios from "axios";

// import { getSecretData, getSecretDataServer } from "../actions";

class Secret extends React.Component {
  // static async getInitialProps({ req }) {
  //   const anotherSecretData = await getSecretData(req);

  //   return { anotherSecretData };
  // }

  state = {
    secretData: []
  };

  async componentDidMount() {
    const res = await axios.get("/api/v1/secret");
    const secretData = res.data;

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

export default withAuth(Secret);
