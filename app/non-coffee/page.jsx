import { Typography } from "@mui/material";
import React from "react";
import ProductGridFiltered from "../components/ProductGridFiltered";

function Snacks() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 pt-20">
      <Typography variant="h3">NON COFFEE</Typography>

      <ProductGridFiltered type={"non-coffee"} />
    </main>
  );
}

export default Snacks;
