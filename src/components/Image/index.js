import React from "react";
import "./style.css";

// Image cards to click on

export default function Image({ name, url, onClick }) {
  return <img className="bg-green my-2" alt={name.replace(".png", "")} src={url} onClick={onClick}/>;
}