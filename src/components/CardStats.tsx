import React from "react";

type Props = {
  statSubtitle: string;
  statTitle: string;
  statArrow: string;
  statPercent: string;
  statPercentColor: string;
  statDescripiron: string;
  statIconName: string;
  statIconColor: string;
};

const CardStats = (props: Props) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {props.statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {props.statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  props.statIconColor
                }
              >
                <i className={props.statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className={props.statPercentColor + " mr-2"}>
              <i
                className={
                  props.statArrow === "up"
                    ? "fas fa-arrow-up"
                    : props.statArrow === "down"
                    ? "fas fa-arrow-down"
                    : ""
                }
              ></i>{" "}
              {props.statPercent}%
            </span>
            <span className="whitespace-nowrap">{props.statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CardStats;
