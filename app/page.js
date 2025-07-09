import Image from "next/image";

import Typography from "@mui/material/Typography";
import Label from "./components/daisyUI/Label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography variant="h2" component="h1" className="text-4xl font-bold">
        RA KAPE
      </Typography>
    </main>
  );
}
