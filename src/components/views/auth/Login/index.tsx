import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email atau password salah");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
      setError("Email atau password salah");
    }
  };

  return (
    <div className={styles.login} style={{ position: "relative" }}>
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
      <div className={styles.login__form} style={{ zIndex: 1 }}>
        <h1 className={styles.login__title}>Yuk Login</h1>
        <p className={styles.login__subtitle}>
          Halo! Login dulu yuk <br></br>ke akun kamu
        </p>
        {error && <p className={styles.login__error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Kata Sandi"
              className={styles.login__form__item__input}
            />
          </div>
          <button type="submit" className={styles.login__form__button}>
            {isLoading ? "Loading..." : "Masuk"}
          </button>
        </form>
        <p className={styles.login__link}>
          Belum punya akun? <Link href="/auth/register">yuk daftar</Link>
        </p>
        <p className={styles.login__link}>
          <Link href={"/home"}>Kembali ke home</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
// test
