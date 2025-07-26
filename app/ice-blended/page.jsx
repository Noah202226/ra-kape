import { Typography } from "@mui/material";
import React from "react";
import ProductGridFiltered from "../components/ProductGridFiltered";

function Coffee() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 pt-20">
      <ProductGridFiltered type={"ice-blended"} />
    </main>
  );
}

export default Coffee;
