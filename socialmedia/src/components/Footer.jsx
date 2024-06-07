import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ backgroundColor: "#303030" }}>
      <div className="d-flex text-center justify-content-evenly p-3">
        <ul className="d-flex list-unstyled">
          <li className="me-2">
            <Link>Terms of Service</Link>
          </li>
          <li className="me-2">
            <Link>Privacy Policy</Link>
          </li>
          <li className="me-2">
            <Link>Cookie Policy</Link>
          </li>
          <li className="me-2">© Our Space Corp</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
