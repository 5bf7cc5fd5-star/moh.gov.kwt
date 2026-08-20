"use client";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: function LoginRedirect() {
    return <Navigate to="/admin" />;
  },
});
