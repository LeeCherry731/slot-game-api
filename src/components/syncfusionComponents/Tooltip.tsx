import React from "react";
import { PositionData, TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
type Props = {};

const Tooltip = (props: Props) => {
  return (
    <TooltipComponent
      className="fixed right-3 bottom-3 z-50"
      content="Settings"
      position="TopCenter"
    >
      <button
        type="button"
        onClick={null}
        style={{ borderRadius: "50%" }}
        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
      >
        <FiSettings className="text-slate-800" />
      </button>
    </TooltipComponent>
  );
};

export default Tooltip;
