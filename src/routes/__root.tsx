import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ChromeOffline } from "@/components/chrome-offline";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "No internet" },
      { name: "theme-color", content: "#f7f7f7" },
      { name: "description", content: "ERR_INTERNET_DISCONNECTED" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      { rel: "icon", href: "data:," },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-white antialiased">
        <PreviewHostBridge />
        <ChromeOffline />
        <Scripts />
      </body>
    </html>
  );
}
