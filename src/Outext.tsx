import React, { useState } from "react";
import { useStore } from "@/store";
import { TextLoader } from "@/components/TextLoader";
import { Button } from "@/components/Button";
import { getRandomNumber } from "./utils";

export default function Outext() {
  const { isStart, isFinish } = useStore();
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-800 text-white select-none">
      <div className="container mx-auto h-full">
        {isStart ? isFinish ? <GameFinish /> : <TextLoader /> : <GameMenu />}
      </div>
    </div>
  );
}

const GameMenu = () => {
  const VERSION = "2.0.0";
  const [isUserSet, setIsUserSet] = useState(false);

  const handleGameStart = () => {
    setIsUserSet(true);
  };

  return (
    <>
      {isUserSet ? (
        <GameStart />
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
    </>
  );
};

const GameStart = () => {
  const { user, setUser, setIsStart, setGameFinishTime } = useStore();
  const maxValue = 10;

  const handleEnterGame = () => {
    setGameFinishTime([Date.now()]);
    setIsStart(true);
  };

  const handleRandom = () => {
    setUser({
      power: getRandomNumber(),
      speed: getRandomNumber(),
    });
  };

  return (
    <div className="flex flex-col mx-auto h-full justify-center items-center pt-5">
      <p>
        <span>力量：</span>
        <span>
          {user.power} / {maxValue}
        </span>
      </p>
      <p>
        <span>速度：</span>
        <span>
          {user.speed} / {maxValue}
        </span>
      </p>

      <Button className="mt-20" onClick={handleRandom}>
        随机属性
      </Button>
      <Button className="mt-4" onClick={handleEnterGame}>
        开始冒险
      </Button>
    </div>
  );
};

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
