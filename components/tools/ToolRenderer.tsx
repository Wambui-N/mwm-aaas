 "use client";

import dynamic from "next/dynamic";
import React from "react";

const Loading = () => (
  <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
    Loading...
  </div>
);

const toolComponents: Record<string, React.ComponentType<any>> = {
  WebhookTester: dynamic(() => import("@/components/tools/WebhookTester"), {
    ssr: false,
    loading: Loading,
  }) as React.ComponentType,
  DocumentSigner: dynamic(() => import("@/components/tools/DocumentSigner"), {
    ssr: false,
    loading: Loading,
  }) as React.ComponentType,
  WorkflowsToAutomateChecklist: dynamic(
    () => import("@/components/checklists/WorkflowsToAutomateChecklist"),
    {
      ssr: false,
      loading: Loading,
    }
  ) as React.ComponentType,
};

export default function ToolRenderer({ componentKey }: { componentKey: string }) {
  const Component = toolComponents[componentKey];
  if (!Component) return null;
  return <Component />;
}

