import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

import withAuth from "../components/hoc/withAuth";

const Owner = props => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>Owner page</BasePage>
    </BaseLayout>
  );
};

// const withSpecificAuth = withAuth("admin"); // другой синтаксис

export default withAuth("siteOwner")(Owner);
