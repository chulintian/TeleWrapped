"use client";

import { useEffect } from "react";

export default function LogoutOnUnload() {
  const logoutAPI = async () => {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionObj: sessionStorage.getItem("session")
        }),
      });

      if (!response.ok) {
        console.error("Logout failed");
      } else {
        console.log("User logged out successfully");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      logoutAPI();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}
