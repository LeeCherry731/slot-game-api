import { Products } from "@prisma/client";
import React, { useEffect, useState } from "react";

type Props = {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  coinProducts: Products;
  resetCoins: number;
};

const CoinProducts = (props: Props) => {
  return (
    <div className="flex justify-center my-5 z-20">
      <div className="block rounded-lg shadow-lg bg-white max-w-xs text-center">
        <div className="py-3 px-6 border-b border-gray-300">
          Coins: {props.coinProducts.amount}
        </div>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            Price: {props.coinProducts.price}
          </h5>
          <p className="text-gray-700 text-base mb-4">
            Coins: {props.coinProducts.amount}
          </p>
        </div>
        <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
          <div className="flex items-center justify-center">
            <div className="inline-flex" role="group">
              <button
                onClick={() => {
                  props.setCoins((prev) =>
                    prev <= 0 || prev <= props.coinProducts.amount
                      ? (prev = 0)
                      : (prev -= props.coinProducts.amount)
                  );
                }}
                type="button"
                className="
        rounded-l
        px-6
        py-2
        border-2 border-blue-600
        text-blue-600
        font-medium
        text-xs
        leading-tight
        uppercase
        hover:bg-black hover:bg-opacity-5
        focus:outline-none focus:ring-0
        transition
        duration-150
        ease-in-out
      "
              >
                -
              </button>
              <button
                onClick={() => {
                  props.setCoins(props.resetCoins);
                }}
                type="button"
                className="
        px-6
        py-2
        border-t-2 border-b-2 border-blue-600
        text-blue-600
        font-medium
        text-xs
        leading-tight
        uppercase
        hover:bg-black hover:bg-opacity-5
        focus:outline-none focus:ring-0
        transition
        duration-150
        ease-in-out
      "
              >
                Reset
              </button>
              <button
                onClick={() => {
                  props.setCoins((prev) => (prev += props.coinProducts.amount));
                }}
                type="button"
                className="
        rounded-r
        px-6
        py-2
        border-2 border-blue-600
        text-blue-600
        font-medium
        text-xs
        leading-tight
        uppercase
        hover:bg-black hover:bg-opacity-5
        focus:outline-none focus:ring-0
        transition
        duration-150
        ease-in-out
      "
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinProducts;
