import React, { useState } from "react";
import Store from "@/store";
import { TextLoader } from "@/components/TextLoader";
import { Button } from "@/components/Button";

export default function Outext() {
  const [isStart, setIsStart] = useState(false);

  return (
    <Store>
      <div className="w-screen h-screen overflow-hidden bg-gray-700 text-white select-none">
        <div className="container mx-auto h-full">
          {isStart ? (
            <TextLoader />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-white text-7xl mb-10 font-semibold">
                Outext
              </h1>
              <h3 className="text-xs my-2">
                作者：
                <a target="_blank" href="https://github.com/mrleidesen">
                  Mr.LeiDeSen
                </a>
              </h3>
              <h3 className="text-xs my-2">版本：v1.0.0</h3>
              <Button className="my-3" onClick={() => setIsStart(true)}>
                开始游戏
              </Button>
            </div>
          )}
        </div>
      </div>
    </Store>
  );
}
