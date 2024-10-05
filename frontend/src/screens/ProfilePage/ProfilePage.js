import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { ProjectsHome } from "../Cards/ProjectsHome";

export default function ProfilePage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <ProjectsHome />
          {/* Your existing code for images and shapes */}
        </div>

        <Footer />
      </div>
    </>
  );
}
