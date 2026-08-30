"use client";

import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "./admin";

export const Route = createFileRoute("/login")({
  component: AdminPage,
});
