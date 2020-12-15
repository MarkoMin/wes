import { useRouter } from "next/router";
import { useEffect } from "react";

export const useGoHomeIfLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage && localStorage.getItem("token")) {
      router.push("/home");
    }
  }, []);
};
