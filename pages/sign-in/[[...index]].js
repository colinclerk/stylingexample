import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="sign-in">
      <h2>Sign in to Leap</h2>
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}
