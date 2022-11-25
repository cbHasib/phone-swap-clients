import { Disclosure } from "@headlessui/react";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const FAQs = () => {
  return (
    <div className="dark:bg-gray-800 px-5 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white/90 text-center">
          FAQs
        </h2>
        <div className="w-full px-4 py-10">
          <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 dark:bg-blue-200 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>Where can I turn in old phones for cash?</span>
                    <IoIosArrowUp
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    In Bangladesh there are many websites to sell your old
                    mobile phone for cash but if your are looking for
                    reliability then PhoneSwap is most trusted platform to sell
                    your mobile for instant cash.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 dark:bg-blue-200 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>How can I sell my old cell phone?</span>
                    <IoIosArrowUp
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    After visiting the PhoneSwap website or app, select the
                    product category you want to sell. Suppose you want to sell
                    your mobile phone - click on the mobile section, select the
                    brand, select the variant and answer a few questions about
                    the state of the device. That's it. After that, PhoneSwap
                    will generate its quote and if you like the price, we will
                    deliver the money to your home and collect your old device.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 dark:bg-blue-200 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>What do you do with my old phone?</span>
                    <IoIosArrowUp
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    Once a phone is sold to us, we refurbish it and rectify
                    whatever issues it might have. Following which, we sell
                    these devices to retailers so that they can be further sold
                    to customers looking to buy second-hand devices.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
