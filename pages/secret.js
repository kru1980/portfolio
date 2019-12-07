import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import withAuth from "../components/hoc/withAuth";

const Secret = props => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>
        secret page
        <h3>supersecret = {props.supersecret ? props.supersecret : ""}</h3>
      </BasePage>
    </BaseLayout>
  );
};

Secret.getInitialProps = () => {
  const supersecret = "123456";
  return { supersecret };
};

export default withAuth(Secret);
