import React from "react";

// Buttons

export default function Button({ text, onClick }) {
  return <button className="btn btn-light btn-lg text-green px-md-3 my-2 mx-2 mx-md-2" type="button" onClick={onClick}>{text}</button>;
}
