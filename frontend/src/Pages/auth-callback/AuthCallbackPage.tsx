import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        // Take user back to home page
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-sky-600 border-white">
        <CardContent className="flex flex-col items-center gap-4 pt-4">
          <Loader className="size-6 text-blue-100 animate-spin" />
          <h3 className="text-zinc-200 text-xl font-bold">Logging you in</h3>
          <p className="text-zinc-200 text-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
