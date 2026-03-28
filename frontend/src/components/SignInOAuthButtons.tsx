import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import google from "../assets/google.png";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="h-10 border-white/15 bg-white/[0.08] text-foreground shadow-sm backdrop-blur-sm hover:bg-white/[0.12]"
    >
      <img src={google} alt="" className="size-5" />
      Continue with Google
    </Button>
  );
};
export default SignInOAuthButtons;
