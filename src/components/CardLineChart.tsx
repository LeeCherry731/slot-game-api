import React from "react";

type Props = {};

const CardLineChart = (props: Props) => {
  return (
    <>
      <div className="z-20 top-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-800 h-96">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="text-white uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Sales value</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLineChart;
