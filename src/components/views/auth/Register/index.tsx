import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
    <div className={styles.register} style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "150px",
          height: "100px",
          zIndex: 1,
        }}
      >
        <Image className="logo" src="/Logo.png" layout="fill" alt="Logo" />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          className="object-cover"
          src="/background.png"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
        />
      </div>
      <div className={styles.register__form} style={{ zIndex: 1 }}>
        <h1 className={styles.register__title}>Daftar dulu lah!</h1>
        <p className={styles.register__subtitle}>
          Kalo belum punya<br></br>akun, daftar dulu yuk!
        </p>
        {error && <p className={styles.register__error}>{error}</p>}
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
          <Button type="submit" className={styles.register__form__button}>
            {" "}
            {isLoading ? "Loading..." : "Daftar"}
          </Button>
        </form>
        <p className={styles.register__link}>
          Sudah punya akun? <Link href="/auth/login">Login Sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
