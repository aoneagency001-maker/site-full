import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Root layout must be minimal for next-intl to work
export default function RootLayout({ children }: Props) {
  return children;
}
