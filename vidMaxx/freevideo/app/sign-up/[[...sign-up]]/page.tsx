import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <SignUp forceRedirectUrl="/dashboard" />
    </div>
  );
}
