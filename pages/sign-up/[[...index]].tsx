import { SignUp } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";

export default function SignUpPage() {
  return <SignUpWithPageClasses />;
}

function SignUpWithPageClasses() {
  const hash = useHashChange();
  const subPage = hash.substring(2) || "start";
  return (
    <div className={`sign-up ${subPage}`} suppressHydrationWarning={true}>
      <h2>Sign up for Leap</h2>
      <SignUp />
    </div>
  );
}

function useHashChange() {
  const [hash, setHash] = useState(
    typeof window != "undefined" ? window.location.hash : ""
  );

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash;
    setHash(hash);
  }, [setHash]);

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleHashChange]);

  return hash;
}
