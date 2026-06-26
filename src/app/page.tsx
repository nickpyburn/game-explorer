import React, { JSX } from "react";
import MainDashboard from "./MainDashboard";

export default function Home(): JSX.Element {
  return (
    <main style={{ padding: "4rem" }}>
      <MainDashboard />
    </main>
  );
}
