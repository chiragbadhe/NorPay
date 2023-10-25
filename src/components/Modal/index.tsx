/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getTokenDataBySymbol } from "../../utils/getTokenData";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  setSelectedToken: any;
  selectedToken: any;
  prices: any;
  setSearchQuery: any;
  filteredTokens: any;
};

function Modal({
  isOpen,
  closeModal,
  filteredTokens,
  setSelectedToken,
  selectedToken,
  prices,
  setSearchQuery,
}: Props) {
  if (!isOpen) {
    return null;
  }

  // Set token and close modal from inside the modal
  const setToken = (token: string) => {
    setSelectedToken(token);
    closeModal();
  };

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute h-screen w-screen flex items-center justify-center left-0 top-0 bg-[#0B0819]/90 z-20 px-[16px] md:px-0"
          >
            <div className="w-[410px] md:h-[461px] relative rounded-[18px] bg-gradient-to-b from-[#27487E] to-[#181627] to-30% bg-[#181627] btn-gradient-1 p-[1px]">
              <div className="bg-[#181627] py-[50px] px-[24px] md:px-[45px] h-full rounded-[18px]">
                <button
                  className="absolute top-0 right-0 m-[12px]"
                  onClick={closeModal}
                >
                  <img src="/images/closebutton.svg" alt="" />
                </button>

                <div className="py-[12px] rounded-full border border-[#6E56F840] flex">
                  <img className="px-[14px]" src="/images/search.svg" alt="" />
                  <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Chains"
                    className="w-full bg-transparent outline-none text-[14px]"
                    name=""
                    id=""
                  />
                </div>

                <div className="mt-[16px]">
                  <div className="max-h-[285px] overflow-scroll">
                    {Object.keys(filteredTokens).map((token) => (
                      <div
                        onClick={() => setToken(token)}
                        key={token}
                        className="px-[16px] py-[12px] rounded-[2px] bg-[#1B192D] flex justify-between items-center mt-[8px]"
                      >
                        <div className="flex items-center space-x-[8px] ">
                          <span>
                            <img
                              className="h-[25px] w-[25px] rounded-full"
                              src={getTokenDataBySymbol(token)?.image}
                              alt=""
                            />
                          </span>
                          <span className="text-[16px]">
                            {getTokenDataBySymbol(token)?.name}
                          </span>
                        </div>
                        <div>
                          {selectedToken === token && (
                            <img src="/images/righttick.svg" alt="" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Modal;
