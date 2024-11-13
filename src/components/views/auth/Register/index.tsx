import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      username: form.username.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <AuthLayout
      title="Daftar yuk!"
      error={error}
      link="/auth/login"
      linkText="Sudah punya akun? Login "
      subtitle="Kalo belum punya akun, daftar dulu ya!"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
        />
        <Input label="Email" name="email" type="email" placeholder="Email" />
        <Input
          label="Phone"
          name="phone"
          type="number"
          placeholder="No. Telepon"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit" className={styles.register__button}>
          {" "}
          {isLoading ? "Loading..." : "Daftar"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
