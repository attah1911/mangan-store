import Link from "next/link";
import styles from "./AuthLayout.module.scss";
import Image from "next/image";

type Proptypes = {
  error?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

const AuthLayout = (props: Proptypes) => {
  const { error, title, link, children, subtitle, linkText } = props;
  return (
    <div className={styles.auth} style={{ position: "relative" }}>
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
        <Image
          className="logo"
          src="/Logo.png"
          fill
          alt="Logo"
          sizes="(height: 100%), (width: 100%)"
          priority
        />
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
          fill
          alt="Background Image"
          priority
        />
      </div>
      <div className={styles.auth__form} style={{ zIndex: 1 }}>
        <h1 className={styles.auth__title}>{title}</h1>
        <p className={styles.auth__subtitle}>{subtitle}</p>
        {error && <p className={styles.auth__error}>{error}</p>}
        {children}
        <p className={styles.auth__link}>
          {linkText} <Link href={link}>disini!</Link>
        </p>
        <p className={styles.auth__link}>
          <Link href={"/home"}>Kembali ke home</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
