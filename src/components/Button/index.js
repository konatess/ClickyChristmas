import React from "react";

// Buttons

export default function Button({ text, onClick }) {
  return <button className="btn btn-light btn-lg text-green my-2 mx-1 mx-md-auto" type="button" onClick={onClick}>{text}</button>;
}
