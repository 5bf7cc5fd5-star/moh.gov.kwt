import { createFileRoute } from "@tanstack/react-router";
import { LandingChoice } from "@/components/landing-choice";
import { PageFrame } from "@/components/page-frame";

export const Route = createFileRoute("/declare/")({ component: DeclareHome });

function DeclareHome() {
  return (
    <PageFrame>
      <LandingChoice />
    </PageFrame>
  );
}
