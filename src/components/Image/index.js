import React from "react";
import "./style.css";

// Image cards to click on

export default function Image({ name, url, onClick }) {
  return <img className="bg-green p-3 m-3" alt={name.replace(".png", "")} src={url} onClick={onClick}/>;
}