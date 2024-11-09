import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

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
    <div className={styles.register}>
      <div className={styles.register__form}>
        <h1 className={styles.register__title}>Daftar dulu lah!</h1>
        <p className={styles.register__subtitle}>
          Kalo belum punya<br></br>akun, daftar dulu yuk!
        </p>
        {error && <p className={styles.register__error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">No. Telp</label>
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder="No. Telp"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="password"
              className={styles.register__form__item__input}
            />
          </div>
          <button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className={styles.register__link}>
          Have an account? Sign in <Link href="/auth/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
