import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";

// import API from Amplify library
import { API } from "aws-amplify";

// import query definition
import { listTodos } from "../graphql/queries";

export default function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);
  async function fetchTodos() {
    try {
      const todoData = await API.graphql({ query: listTodos });
      setTodos(todoData.data.listTodos.items);
      console.log(todoData);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Hello World</h1>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.name}</h3>
              <p>{todo.location}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
