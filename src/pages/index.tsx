import { withUrqlClient } from "next-urql/";
import React from "react";
import { useSession } from "next-auth/client";
import Landing from "../components/home/Landing";
import Feed from "../components/home/Feed";

const Home = () => {
  const [session] = useSession();

  return session ?
    (
      <Feed />
    )
    :
    (
      <Landing />
    )
};

export default withUrqlClient(() => ({
  url: "https://server-seven-blue.vercel.app/graphql",
}))(Home);
