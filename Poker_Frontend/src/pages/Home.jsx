import React, { Component } from "react";
import CustomFooter from "../components/CustomFooter";
import Content from "./PagesSubSections/HomePage/Content";
import ImageContainer from "./PagesSubSections/HomePage/ImageContainer";

export class Home extends Component {
  render() {
    return (
      // Main container for the Home page
      <div className="p-4  h-[90vh] w-screen">
        {/* Main content section with text and image */}
        <main className=" h-full flex">
          {/* Text content and stats */}
          <Content />
          {/* Image section */}
          <ImageContainer />
        </main>
      </div>
    );
  }
}

export default Home;
