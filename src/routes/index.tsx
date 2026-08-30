import { createFileRoute } from "@tanstack/react-router";
import { LandingHome } from "@/components/landing-home";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LandingHome />;
}
