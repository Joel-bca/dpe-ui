"use client";

import { Amplify } from "aws-amplify";
import amplifyOutputs from "../../amplify_outputs.json";

// ✅ FIX: use amplifyOutputs directly, not amplifyOutputs.data
Amplify.configure({
  ...amplifyOutputs,
  API: {
    GraphQL: {
      defaultAuthMode: "apiKey",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
