/* eslint-disable @next/next/no-img-element */
import { ConnectKitButton } from "connectkit";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

function MainHeader({}: Props) {
  const [activeTab, setActiveTab] = useState("trade");
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  //Framer motion animation
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-[#0B0819] w-screen ">
      <div className="container mx-auto flex justify-between px-[16px] ">
        <div className="py-[14px] ">
          <img
            className="h-[40px] md:h-[50px]"
            src="/images/norpay-logo.svg"
            alt=""
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          className="px-[6px] rounded-[2px] bg-[#1C1731] flex z-40 items-center justfy-center my-[16px] md:hidden"
        >
          <button onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
            <img src="/images/align-justify.svg" alt="" />
          </button>{" "}
        </motion.div>

        {/* For Mobile Screen Only */}
        <AnimatePresence>
          {isHamburgerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bg-[#0B0819]/10 h-screen w-screen left-0 z-30 bg-opacity-90 backdrop-blur-lg"
            >
              <div className="absolute bg-[#0B0819]/10 h-screen w-screen left-0 z-30 bg-opacity-90 backdrop-blur-lg"></div>
              <div className="absolute bg-[#0B0819]/90 right-0 w-3/5 h-full  z-30 ">
                <div className="flex flex-col  mt-[54px] w-full  text-[18px] font-normal text-[#5A5A5A] ">
                  <button
                    className=" border-b  py-[12px] border-[#627EEA] text-[#627EEA]"
                    onClick={() => setActiveTab("trade")}
                  >
                    Trade
                  </button>
                  <button
                    className="border-b border-white/40  py-[12px] "
                    onClick={() => setActiveTab("earn")}
                  >
                    Earn
                  </button>
                  <button
                    className="border-b border-white/40  py-[12px] "
                    onClick={() => setActiveTab("support")}
                  >
                    Support
                  </button>
                  <button
                    className="border-b border-white/40  py-[12px]"
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </button>
                </div>

                <div>
                  <div className="py-[14px] px-[16px]">
                    <div className="p-[1px] bg-gradient-to-b from-[#A3ABE8] to-[#A3ABE8]/10  rounded-full mt-[12px] ">
                      <ConnectKitButton.Custom>
                        {({ isConnected, show, truncatedAddress, ensName }) => {
                          return (
                            <button
                              onClick={show}
                              className="px-[17px] py-[10px] w-full header-Button-Gradient rounded-full text-[17px] font-bold"
                            >
                              {isConnected
                                ? !ensName
                                  ? truncatedAddress
                                  : ensName
                                : "Connect Wallet"}
                            </button>
                          );
                        }}
                      </ConnectKitButton.Custom>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* For Desktop Screen */}
        <div className=" space-x-[24px]  text-[16px] font-normal text-[#5A5A5A] hidden md:flex">
          <button
            className="w-[76px] border-b border-[#627EEA] text-[#627EEA]"
            onClick={() => setActiveTab("trade")}
          >
            Trade
          </button>
          <button className="w-[76px] " onClick={() => setActiveTab("earn")}>
            Earn
          </button>
          <button className="w-[76px] " onClick={() => setActiveTab("support")}>
            Support
          </button>
          <button className="w-[76px] " onClick={() => setActiveTab("about")}>
            About
          </button>
        </div>
        <div className="py-[14px] hidden md:flex">
          <div className="p-[1px] bg-gradient-to-b from-[#A3ABE8] to-[#A3ABE8]/10  rounded-full">
            <ConnectKitButton.Custom>
              {({ isConnected, show, truncatedAddress, ensName }) => {
                return (
                  <button
                    onClick={show}
                    className="px-[17px] py-[10px] header-Button-Gradient rounded-full text-[17px] font-bold"
                  >
                    {isConnected
                      ? !ensName
                        ? truncatedAddress
                        : ensName
                      : "Connect Wallet"}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainHeader;
