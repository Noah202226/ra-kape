import { Typography } from "@mui/material";
import React from "react";
import ProductGridFiltered from "../components/ProductGridFiltered";

function page() {
  return (
    <main className="flex min-h-screen  w-full flex-col items-center justify-center px-0 md:px-24 pt-0  md:pt-20">
    

      <ProductGridFiltered type={"ice-drip-coffee"} />
    </main>
  );
}

export default page;
