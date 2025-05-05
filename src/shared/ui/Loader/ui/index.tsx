import styles from "./Loader.module.css";
import { ModalWrapper } from "shared";

export const Loader = () => {
  return (
    <ModalWrapper>
      <div className={styles.twister}>
        <div className={styles.box1}></div>
        <div className={styles.box2}></div>
        <div className={styles.box3}></div>
      </div>
    </ModalWrapper>
  );
};
