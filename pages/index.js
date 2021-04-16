import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import CustomSignUp from "../components/CustomSignUp";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Homepage</h1>

      <SignedIn>
        Already signed in
        <UserButton />
      </SignedIn>
      <SignedOut>
        <h2>Sign up</h2>
        <CustomSignUp />
      </SignedOut>
    </div>
  );
}
