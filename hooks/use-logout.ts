import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout");
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return handleLogout;
};
