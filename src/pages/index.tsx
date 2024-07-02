import type { NextPage } from "next";
import Head from "next/head";
import site from "../../public/site.json";
import Page from "../components/page/Page";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{site.pageTitle}</title>
        <meta name="description" content="Our Team Charter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page {...site}></Page>
    </>
  );
};

export default Home;
