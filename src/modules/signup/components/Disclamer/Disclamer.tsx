import Link from "next/link";
import React from "react";

const Disclamer: React.FC = () => {
  return (
    <p className="disclamer">
      <span>Already have a Peerplays account?</span>
      <Link href="/login">
        <a>Log in</a>
      </Link>
    </p>
  );
};

export default Disclamer;
