/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { io } from "socket.io-client";
import { getTokenDataBySymbol } from "../../utils/getTokenData";
import useUSDTPrice from "@/hooks/useUsdtPrice";

type Props = {};

type TokenPrices = {
  [symbol: string]: any;
};

type BinanceResponse = {
  symbol: string;
  price: any;
}[];

function TradePage({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inrAmount, setInrAmount] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTokens, setFilteredTokens] = useState<TokenPrices>({});

  const [prices, setPrices] = useState<TokenPrices>({});
  const [selectedToken, setSelectedToken] = useState<string>("BTCUSDT");

  const { usdtPrice, loading, error } = useUSDTPrice();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Update the list when user search
  const updateFilteredTokens = useCallback(
    (query: string) => {
      const filtered = Object.keys(prices)
        .filter((symbol) => symbol.toLowerCase().includes(query.toLowerCase()))
        .reduce((obj, key) => {
          obj[key] = prices[key];
          return obj;
        }, {} as TokenPrices);
      setFilteredTokens(filtered);
    },
    [prices]
  );

  useEffect(() => {
    // WebSocket connection to Binance
    const socket = io("wss://stream.binance.com:9443/ws/btcusdt@trade");
    // Fetch and display initial tokens
    const fetchTokens = async () => {
      try {
        const response = await axios.get<BinanceResponse>(
          "https://api.binance.com/api/v3/ticker/price"
        );

        // Filter the response to include only pairs with USDT
        const usdtPairs = response.data.filter((token) =>
          token.symbol.endsWith("USDT")
        );

        const top20Pairs = usdtPairs.slice(0, 20);

        const tokenPrices: TokenPrices = {};

        top20Pairs.forEach((token) => {
          tokenPrices[token.symbol] = token.price;
        });

        setPrices(tokenPrices);

        updateFilteredTokens(searchQuery);
      } catch (error) {
        console.error("Error fetching token prices:", error);
      }
    };

    fetchTokens();

    // Real-time price updates
    socket.on("trade", (tradeData) => {
      const { s: symbol, p: price } = tradeData;
      setPrices((prevPrices) => ({ ...prevPrices, [symbol]: price }));
    });

    return () => {
      socket.close();
    };
  }, [searchQuery, updateFilteredTokens]);

  useEffect(() => {
    updateFilteredTokens(searchQuery);
  }, [searchQuery, updateFilteredTokens]);

  const handleInrAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (
      inputValue === "" ||
      (!inputValue.includes("e") && parseFloat(inputValue) >= 0)
    ) {
      setInrAmount(inputValue as any);
    }
  };

  //Format scientific number when small on digits
  const formatScientificNumber = (number: any) => {
    if (number.toString().includes("e")) {
      const scientificNotationNumber = number;
      const decimalPlaces = 20;
      const formattedNumber = scientificNotationNumber.toFixed(decimalPlaces);
      return formattedNumber;
    } else {
      return number;
    }
  };

  const formattedPrice = (
    prices[selectedToken] * (usdtPrice as any)
  ).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <main
      className={`flex flex-col items-center ${
        !isModalOpen ? "md:my-[100px] my-[60px] " : "md:mt-[100px] mt-[60px] "
      }   mx-[16px] `}
    >
      <Modal
        prices={prices}
        isOpen={isModalOpen}
        filteredTokens={filteredTokens}
        selectedToken={selectedToken}
        setSelectedToken={setSelectedToken}
        closeModal={closeModal}
        setSearchQuery={setSearchQuery}
      />

      <div className="h-[70px] w-[70px] bg-[#1C1731]  rounded-full relative z-10 -mb-[46px] -mr-[3px] flex items-center justify-center ">
        <img
          className="h-[50px] w-[50px] rounded-full hover:rotate-180 duration-300"
          src={getTokenDataBySymbol(selectedToken)?.image}
          alt="ethereum-logo"
        />
      </div>

      <div className="md:w-[470px] w-full  rounded-t-[18px] relative  bg-gradient-to-b from-[#46425E] to-[#000]/0 p-[1px]">
        <div className="absolute -mt-[13px] w-full  flex items-center justify-center ">
          <img src="/images/oval-shape.svg" alt="ethereum-logo" />
        </div>

        <div className="bg-[#0B0819]  rounded-[18px] w-full h-full px-[24px] md:px-[44px] pt-[72px] pb-[48px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#C5C5C5]">Current Value</span>
            <span className="text-[#627EEA] text-[24px] font-semibold">
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={openModal}
            className="px-[26px] w-full py-[19px] rounded-[10px] bg-[#1C1731] flex justify-between items-center mt-[18px]"
          >
            <div className="flex items-center space-x-[8px] ">
              <span>
                <img
                  className="h-[25px] w-[25px] rounded-full"
                  src={getTokenDataBySymbol(selectedToken)?.image}
                  alt=""
                />
              </span>
              <span className="text-[16px]">
                {getTokenDataBySymbol(selectedToken)?.name}
              </span>
            </div>

            <div>
              <img src="/images/dropdown.svg" alt="" />
            </div>
          </button>

          <div className="mt-[24px]">
            <div>
              <span className="text-[14px] text-[#C5C5C5]">
                Amount you want to invest
              </span>
            </div>
            <div className="px-[26px] py-[14px] rounded-[10px] border border-[#6E56F8]/30 flex justify-between items-center mt-[18px]">
              <input
                type="number"
                placeholder="0.00"
                value={inrAmount === null ? "" : inrAmount} // Convert to string if not null
                onChange={handleInrAmountChange}
                className="text-[22px] font-semibold bg-transparent outline-none text-[#6F6F7E]"
              />

              <div>
                <span>INR</span>
              </div>
            </div>
          </div>

          <div className="mt-[24px]">
            <div>
              <span className="text-[14px] text-[#C5C5C5]">
                Estimate Number of {getTokenDataBySymbol(selectedToken)?.name}{" "}
                You will Get
              </span>
            </div>
            <div className="px-[26px] py-[14px] rounded-[10px] bg-[#1C1731] flex items-center mt-[18px]">
              <span className="text-[22px] font-semibold text-[#6F6F7E]">
                {inrAmount !== null
                  ? formatScientificNumber(
                      (inrAmount as any) /
                        (usdtPrice as any) /
                        prices[selectedToken]
                    )
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-[50px]">
            <div className="p-[1px] bg-gradient-to-b from-[#A3ABE8] to-[#A3ABE8]/10  rounded-full">
              <button className="py-[12px] w-full header-Button-Gradient rounded-full text-[17px] font-bold">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TradePage;
