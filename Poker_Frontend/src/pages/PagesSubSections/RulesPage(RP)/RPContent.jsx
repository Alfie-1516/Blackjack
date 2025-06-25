import React, { Component } from "react";

export class RPContent extends Component {
  render() {
    const { number, title, green_title, description, main_points } = this.props;
    return (
      // Main container for the rule content section
      <div className="w-1/2 h-full flex flex-col justify-start pt-20">
        {/* Rule number display */}
        <div>
          <p className="text-[50px] font-medium underline decoration-solid decoration-[#8db48e] decoration-2">
            {number}#
          </p>
        </div>
        {/* Rule title and description */}
        <div>
          <h1 className="text-lg text-black text-[32px] font-bold">
            {number === 1 ? (
              <>
                <span className="text-[#8db48e]">{green_title}</span> {title}
              </>
            ) : (
              <>
                {title}
                <span className="text-[#8db48e]">{green_title}</span>
              </>
            )}
          </h1>
          <p>{description}</p> <br />
          {/* Main points list */}
          {main_points.map((value, idx) => (
            <div className="flex">
              <p key={idx} className="font-light">
                <span className="font-semibold">{value.point_title}</span>
                {value.point}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RPContent;
