import React from "react";
import { Link } from "react-router-dom";

export default function ErrorHandling() {
  return (
    <div>
      <h2>
        404 : We are sorry but it looks like we dont have what are you looking
        for!
      </h2>
      <Link to="/">Back Home</Link>
    </div>
  );
}
