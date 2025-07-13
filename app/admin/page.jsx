import { Typography } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 pt-20">
      <Typography variant="h3">Admin page</Typography>

      <LoginForm />
    </main>
  );
}

export default page;
