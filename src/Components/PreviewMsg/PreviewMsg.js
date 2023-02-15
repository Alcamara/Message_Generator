import React from "react";
import "./PreviewMsg.css";

export const PreviewMsg = ({ msg }) => {
  return (
    <div className="preview-section">
      <div className="preview-section_content">
        <p>{msg}</p>
      </div>
    </div>
  );
};
