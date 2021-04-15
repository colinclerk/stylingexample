import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="sign-up">
      <h2>Sign up for Leap</h2>
      <SignUp />
    </div>
  );
}
