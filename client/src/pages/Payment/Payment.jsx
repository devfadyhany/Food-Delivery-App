import React from "react";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <iframe
      src={searchParams.get("frame")}
      sandbox="allow-forms allow-scripts"
      width="100%"
      height="700px"
      style={{
        marginTop: "100px",
        border: "none",
        borderRadius: "24px",
        boxShadow: "0 0 15px 5px rgba(0,0,0,0.2)",
      }}
    />
  );
};

export default Payment;
