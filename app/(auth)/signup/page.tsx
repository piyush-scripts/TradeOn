import BasicForm from "@/components/custom/basicForm";

export default function SignupPage() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <BasicForm  heading="Create Account" buttonText="Create account" />
      
    </div>
  );
}
