import { createFileRoute } from "@tanstack/react-router";
import { ShutdownPage } from "@/components/shutdown-page";

export const Route = createFileRoute("/services/$slug")({
  component: ShutdownPage,
});
