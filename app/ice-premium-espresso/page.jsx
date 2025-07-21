import { Typography } from "@mui/material";
import React from "react";
import ProductGridFiltered from "../components/ProductGridFiltered";

function Frappe() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 pt-20">
      <Typography variant="h3">ICE PREMIUM ESPRESSO</Typography>

      <ProductGridFiltered type={"ice-premium-espresso"} />
    </main>
  );
}

export default Frappe;
