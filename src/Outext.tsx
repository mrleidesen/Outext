import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import { TextLoader } from "@/components/TextLoader";
import { Button } from "@/components/Button";
import { getRandomNumber, formatTime } from "./utils";
import { TLimitType } from "./types";

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
  const VERSION = "2.0.1";
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
          <a
            target="_blank"
            className="text-xs text-center my-2"
            href="https://github.com/mrleidesen/Outext"
          >
            ❤❤❤ 一人在家 ❤❤❤ <br />
            ❤❤❤ 开源仓库 ❤❤❤ <br />
            ❤❤🔞 不见不散 🔞❤❤ <br />
            ❤❤🔞 等你来写 🔞❤❤ <br />
          </a>
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
  const userKeys = Object.keys(user) as TLimitType[];
  const typeMap: { [key in TLimitType]: string } = {
    power: "力量",
    speed: "技巧",
    wise: "智慧",
    luck: "幸运",
  };

  useEffect(() => {
    initUser();
  }, []);

  const handleEnterGame = () => {
    setGameFinishTime([Date.now()]);
    setIsStart(true);
  };

  const onRandomUserAttributes = () => {
    const userAttributes = { ...user };

    for (const key of userKeys) {
      userAttributes[key] = getRandomNumber();
    }

    return userAttributes;
  };

  const initUser = () => {
    setUser(onRandomUserAttributes());
  };

  // 玩家自己随机属性
  // const handleRandom = () => {
  //   initUser();
  //   setAttributeCount(attributeCount + 1);
  // };

  return (
    <div className="flex flex-col mx-auto h-full justify-center items-center pt-5">
      <p>以下是随机生成的人物属性</p>
      {userKeys.map((key) => (
        <p key={key}>
          <span>{typeMap[key]}：</span>
          <span>
            {user[key]} / {maxValue}
          </span>
        </p>
      ))}

      {/* <Button className="mt-20" onClick={handleRandom}>
        随机属性
      </Button> */}
      <Button className="mt-4" onClick={handleEnterGame}>
        开始冒险
      </Button>
    </div>
  );
};

const GameFinish = () => {
  const { gameFinishTime, deathCount, restart } = useStore();
  const [startTime, finishTime] = gameFinishTime;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-2">恭喜你通关了</h1>
      <p className="my-1">你总共死了 {deathCount} 次</p>
      {/* <p className="my-1">你随机了 {attributeCount} 次属性才找到你满意的</p> */}
      <p>通关时间 {formatTime(startTime, finishTime)} 分钟</p>

      <Button className="my-2" onClick={() => restart()}>
        重新游玩
      </Button>
    </div>
  );
};
