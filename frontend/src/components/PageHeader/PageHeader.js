import React from "react";
import { Container } from "reactstrap";
import "./PageHeader.css";

export default function PageHeader() {
  return (
    <div className="page-header">
      <video
        src="https://s3.amazonaws.com/webflow-prod-assets/65804fa74751b18ff1417299/65aefd1fef7c94e12eda7260_self-serve%20(1).mp4"
        className="header-video"
        autoPlay
        loop
        muted
      />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">Azure•Blueprints</h1>
        </div>
      </Container>
    </div>
  );
}
