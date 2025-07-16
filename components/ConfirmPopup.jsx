import { useEffect } from "react";
import "/styles/confirmPopup.css";

export default function ConfirmPopup({ message, onConfirm, onCancel }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onCancel();
    }, 5000); // auto-close after 5s if no action
    return () => clearTimeout(timeout);
  }, [onCancel]);

  return (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup">
        <p>{message}</p>
        <div className="confirm-popup-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            OK
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
