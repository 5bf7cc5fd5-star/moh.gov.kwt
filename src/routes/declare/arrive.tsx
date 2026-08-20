import { createFileRoute } from "@tanstack/react-router";
import { DeclarationForm } from "@/components/declaration-form";
import { PageFrame } from "@/components/page-frame";

export const Route = createFileRoute("/declare/arrive")({
  component: ArrivePage,
});

function ArrivePage() {
  return (
    <PageFrame>
      <DeclarationForm direction="arrive" />
    </PageFrame>
  );
}
