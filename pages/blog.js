import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

const Blog = props => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>Blog page</BasePage>
    </BaseLayout>
  );
};

export default Blog;
