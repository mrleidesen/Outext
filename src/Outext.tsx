import React from "react";
import { useStore } from "@/store";
import { TextLoader } from "@/components/TextLoader";
import { Button } from "@/components/Button";

import githubIcon from "@/assets/github.svg";

export default function Outext() {
  const VERSION = "1.1.1";
  const { isFinish, isStart, setIsStart, setGameFinishTime } = useStore();

  const handleGameStart = () => {
    setGameFinishTime([Date.now()]);
    setIsStart(true);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-800 text-white select-none">
      <div className="container mx-auto h-full">
        {isStart ? (
          isFinish ? (
            <GameFinish />
          ) : (
            <TextLoader />
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-7xl mb-10 font-semibold">Outext</h1>
            <h3 className="text-xs my-2">
              作者：
              <a target="_blank" href="https://github.com/mrleidesen/Outext">
                Mr.LeiDeSen
              </a>
            </h3>
            <h3 className="text-xs my-2">版本：v{VERSION}</h3>
            <Button className="my-3" onClick={handleGameStart}>
              开始游戏
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const GameFinish = () => {
  const { gameFinishTime, deathCount, restart } = useStore();

  const formatTime = () => {
    const [startTime, finishTime] = gameFinishTime;
    const time = finishTime - startTime;

    return (time / 1000 / 60).toFixed(1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-2">恭喜你通关了</h1>
      <p className="my-1">你总共死了 {deathCount} 次</p>
      <p>通关时间 {formatTime()} 分钟</p>

      <Button className="my-2" onClick={() => restart()}>
        重新游玩
      </Button>
    </div>
  );
};
