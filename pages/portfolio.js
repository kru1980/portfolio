import React from "react";
import { useRouter } from "next/router";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/layouts/BasePage";

const Portfolio = ({ postId, auth }) => {
  return (
    <BaseLayout {...auth}>
      <BasePage>
        <h3>Portfolio page</h3>
        <main>
          <br />
          postId: {postId}
          {/* client id: {idClient} */}
          <h4>null</h4>
        </main>
      </BasePage>
    </BaseLayout>
  );
};

Portfolio.getInitialProps = async ({ query }) => {
  const postId = query.id;

  return { postId };
};

export default Portfolio;
