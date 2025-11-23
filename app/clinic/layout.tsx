import { Toaster } from "sonner";

export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="top-center" duration={4000} />
    </>
  );
}

