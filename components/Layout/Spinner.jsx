// components/Layout/Spinner.jsx
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "/styles/spinner.css";

export default function Spinner({ size = 32, color = "#4b5563" }) {
  return (
    <div className="spinner-container">
      <AiOutlineLoading3Quarters
        size={size}
        color={color}
        className="modern-spinner"
      />
    </div>
  );
}
