import { ReactNode } from "react";
import styles from "./ModalWrapper.module.css";

interface IModalWrapperProps {
  children: ReactNode;
}

export const ModalWrapper = ({ children }: IModalWrapperProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};
