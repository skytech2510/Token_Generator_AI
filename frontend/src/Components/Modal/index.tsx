import styles from "./modal.module.scss";
import warning from "Assets/Images/Icons/warning.svg";
import flask from "Assets/Images/Icons/flask.svg";

interface ModalProps {
  onClose: () => void;
  title: string;
  icon: string;
  message: string;
  buttonMessage: string;
}

const Modal = (props: ModalProps) => {
  const { onClose, title, message, icon, buttonMessage } = props;

  const handleSubmit = async () => {
    onClose();
  };

  return (
    <div className={styles.backdrop}>
      <div className={`window ${styles.container}`}>
        <div className="title-bar">
          <div className="title-bar-text">Confirmation</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>

        <div className={styles.header}>
          {icon == "1" ? (
            <img src={warning} height="36px" width="36px" />
          ) : (
            <img src={flask} height="36px" width="36px" />
          )}
          <h6>{title}</h6>
        </div>
        <div className={styles.body}>
          <span>{message}</span>
          <button onClick={handleSubmit}>{buttonMessage}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
