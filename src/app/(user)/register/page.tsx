import UserRegisterForm from "@/components/user/UserRegisterForm";

export default function UserRegister() {
  return (
    <div className="min-h-screen">
      <h2 className="flex justify-center items-center my-5 text-xl font-bold text-black">
        User Registration Page
      </h2>

      <UserRegisterForm />
    </div>
  );
}
