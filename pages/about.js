import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";
import { Button } from "reactstrap";

const About = props => {
  // console.log("props about", props);

  return (
    <BaseLayout title="About as" {...props.auth}>
      <BasePage className="about-page">
        <div>
          <p>about page</p>
          <Button color="danger"></Button>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
