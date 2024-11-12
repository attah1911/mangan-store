import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};

const Input = (props: Proptypes) => {
  const { name, type, placeholder } = props;
  return (
    <div className={styles.container}>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={styles.container__input}
      />
    </div>
  );
};

export default Input;
