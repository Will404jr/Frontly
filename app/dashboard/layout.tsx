import Component from "./Component";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Component>{children}</Component>;
}
