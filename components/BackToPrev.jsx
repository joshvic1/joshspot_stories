"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import "/styles/BackToPrev.css";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="back">
      <button onClick={() => router.back()} className="back-btn">
        <FiArrowLeft size={20} style={{ marginRight: "8px" }} />
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
