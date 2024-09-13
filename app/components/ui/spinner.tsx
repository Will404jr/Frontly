// components/ui/spinner.tsx
import { Loader } from "lucide-react";

const Spinner = ({ className }: { className?: string }) => (
  <Loader className={`animate-spin ${className || "h-8 w-8"}`} />
);

export default Spinner;
