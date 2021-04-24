import React from "react";
import { withClerk } from "@clerk/clerk-react";
import { ClerkField } from "./ClerkField";
import {
  useClerkFieldState,
  buildClerkRequest,
  handleClerkError,
} from "../utils/clerk";

import Router from "next/router";

export default withClerk(({ clerk }) => {
  const [step, setStep] = React.useState("start");

  if (step === "start") {
    return <Start attempt={clerk.client.signUpAttempt} setStep={setStep} />;
  } else if (step === "verify") {
    return (
      <Verify
        attempt={clerk.client.signUpAttempt}
        setStep={setStep}
        setSession={clerk.setSession}
      />
    );
  }
});

const Start = ({ attempt, setStep }) => {
  const firstName = useClerkFieldState();
  const lastName = useClerkFieldState();
  const emailAddress = useClerkFieldState();
  const password = useClerkFieldState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      first_name: firstName,
      last_name: lastName,
      email_address: emailAddress,
      password: password,
    };
    try {
      await attempt.create(buildClerkRequest(fields));

      // Two options here. Style the verify step yourself,
      // or forward to the clerk component.

      Router.push("/sign-up/verify-email-address");
      //setStep("verify");
    } catch (e) {
      handleClerkError(e, fields);
    }
  };

  const externalSignUp = async (provider) => {
    // Go to clerk's component to handle the SSO callback
    // This will trigger a SignIn if the user has already
    // signed up.
    const redirectUrl = new URL("/sign-up#/sso-callback", window.location.href);

    // If oauth results in a completed sign up, skip the
    // redirectUrl above and go straight here.
    const signUpCompleteRedirectUrl = new URL("/", window.location.href);

    const response = await attempt.create({
      external_account_strategy: provider,
      external_account_redirect_url: redirectUrl.href,
      external_account_action_complete_redirect_url:
        signUpCompleteRedirectUrl.href,
    });
    window.location.href =
      response.externalAccountVerification.externalVerificationRedirectURL.href;
  };

  return (
    <form onSubmit={onSubmit}>
      <ClerkField state={firstName} label="First name" />
      <ClerkField state={lastName} label="Last name" />
      <ClerkField state={emailAddress} label="Email address" />
      <ClerkField state={password} label="Password" type="password" />
      <div>
        <button type="submit">Continue</button>
      </div>

      <div>
        <button onClick={() => externalSignUp("oauth_google")} type="button">
          Sign up with Google
        </button>
      </div>
      <div>
        <button onClick={() => externalSignUp("oauth_facebook")} type="button">
          Sign up with Facebook
        </button>
      </div>
    </form>
  );
};

const Verify = ({ attempt, setStep, setSession }) => {
  const code = useClerkFieldState();

  React.useEffect(() => {
    attempt.prepareEmailAddressVerification();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      code: code,
    };
    try {
      const response = await attempt.attemptEmailAddressVerification(
        buildClerkRequest(fields)
      );
      setSession(response.createdSessionId, () => {
        // After sign up URL?
        Router.push("/");
      });
    } catch (e) {
      handleClerkError(e, fields);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <ClerkField state={code} label="Code" />
      <button type="submit">Sign up</button>
    </form>
  );
};
