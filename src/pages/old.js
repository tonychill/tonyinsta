import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { listPosts } from "../graphql/queries";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { API, Auth } from "aws-amplify";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
    checkUser(); // new function call
  }, []);
  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user: ", user);
    console.log("user attributes: ", user.attributes);
  }
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items);
      console.log(postData);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>My Insta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Hello World</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
          </div>
        ))}
      </main>
      <AmplifySignOut />
    </div>
  );
}
export default withAuthenticator(Home);
