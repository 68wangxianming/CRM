import * as React from "react";

const Footer = ({ remaining, total }:any) => {
  return (
    <p>
      {remaining} / {total} left
    </p>
  );
};

export default Footer;
