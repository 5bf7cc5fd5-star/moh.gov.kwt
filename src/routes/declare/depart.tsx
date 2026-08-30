import { createFileRoute } from "@tanstack/react-router";
import { DeclarationForm } from "@/components/declaration-form";
import { PageFrame } from "@/components/page-frame";

export const Route = createFileRoute("/declare/depart")({
  component: DepartPage,
});

function DepartPage() {
  return (
    <PageFrame>
      <DeclarationForm direction="depart" />
    </PageFrame>
  );
}
