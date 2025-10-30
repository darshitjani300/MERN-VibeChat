import styles from "./button.module.scss";

type Props = {
  btn?: string;
  loading?: boolean;
};

const ButtonComp = (props: Props) => {
  const { btn, loading } = props;
  return (
    <button className={styles.btn} disabled={loading} type="submit">
      {btn}
    </button>
  );
};

export default ButtonComp;
