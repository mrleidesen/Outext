import React, { useEffect, useState } from "react";

import { useStore } from "@/store";
import { screenplay } from "@/data";
import {
  TScene,
  TAction,
  TActionList,
  TActionType,
  TActionLimit,
  TActionData,
} from "@/types";
import { Button } from "./Button";
import { Countdown } from "./Countdown";

export const TextLoader = () => {
  const { select } = useStore();
  const [scene, setScene] = useState<TScene>([]);
  const [showIndex, setShowIndex] = useState(1);
  const sceneLoader = scene.slice(0, showIndex);
  const lastIsString = typeof sceneLoader[showIndex - 1] === "string";
  let isDisabled = false;

  useEffect(() => {
    setShowIndex(1);
    setScene(screenplay[select]);
  }, [select]);

  useEffect(() => {
    isDisabled = false;
  }, [showIndex]);

  const handleNext = () => {
    if (!lastIsString || isDisabled) {
      return;
    }
    isDisabled = true;
    setShowIndex((idx) => idx + 1);
  };

  return (
    <div className="p-2 flex flex-col items-center w-full">
      {sceneLoader.map((item, idx) => (
        <SceneItem key={idx} scene={item} />
      ))}
      {lastIsString && (
        <Button
          className={`fixed bottom-4 w-5/6 ${
            isDisabled ? "pointer-events-none" : ""
          }`}
          onClick={handleNext}
        >
          下一步
        </Button>
      )}
    </div>
  );
};

const SceneSelector = ({
  actions,
  type,
}: {
  actions: TActionList;
  type: TActionType;
}) => {
  const { user, setSelect, setDeathCount } = useStore();

  const handleActionClick = (type: TActionType, action: TActionData) => {
    if (type === "end") {
      setDeathCount((count) => count + 1);
    }
    if (action[3] && !isFits(action[2])) {
      setSelect(action[3]);
      return;
    }
    setSelect(action[1]);
  };

  const isFits = (values?: TActionLimit[]): boolean => {
    let isFits = true;

    if (values) {
      for (const limit of values) {
        const { type, minValue } = limit;
        const userValue = user[type];
        if (userValue < minValue) {
          isFits = false;
          break;
        }
      }
    }

    return isFits;
  };

  return (
    <>
      {actions.map((action) => {
        if (action[3] || isFits(action[2])) {
          return (
            <Button
              key={action[0]}
              className="mb-2"
              onClick={() => {
                handleActionClick(type, action);
              }}
            >
              {action[0]}
            </Button>
          );
        }
      })}
    </>
  );
};

const SceneItem = ({ scene }: { scene: string | TAction }) => {
  const { setSelect, setIsFinish, setGameFinishTime } = useStore();
  const itemIsString = typeof scene === "string";

  if (itemIsString) {
    return <p className="text-center mb-1.5">{scene}</p>;
  }

  useEffect(() => {
    let timer: number | null = null;

    const setTimer = () => {
      if (!scene.timeout) {
        clearTimer();
        return;
      }
      clearTimer();
      timer = setTimeout(() => {
        setSelect("end-noselect");
      }, scene.timeout * 1000);
    };

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    setTimer();

    return () => {
      clearTimer();
    };
  }, [scene.timeout]);

  if (scene.action === "select" || scene.action === "end") {
    return (
      <div className="flex flex-col w-full mt-3">
        {scene.timeout && <Countdown count={scene.timeout} />}
        {scene.data && (
          <SceneSelector type={scene.action} actions={scene.data} />
        )}
      </div>
    );
  }

  if (scene.action === "finish") {
    return (
      <Button
        className="mt-3"
        onClick={() => {
          setGameFinishTime((time) => [...time, Date.now()]);
          setIsFinish(true);
        }}
      >
        结束游戏
      </Button>
    );
  }

  return <p>Error!</p>;
};
