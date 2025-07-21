import { Typography } from "@mui/material";
import React from "react";
import ProductGridFiltered from "../components/ProductGridFiltered";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 pt-20">
      <Typography variant="h3">ICE DRIP COFFEE</Typography>

      <ProductGridFiltered type={"ice-drip-coffee"} />
    </main>
  );
}

export default page;
