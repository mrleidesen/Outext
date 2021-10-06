import React, { useEffect, useState, FC } from "react";

import { useStore } from "@/store";
import { screenplay } from "@/data";
import { TScene, TAction } from "@/types";
import { Button } from "./Button";
import { Countdown } from "./Countdown";

export const TextLoader = () => {
  const { select } = useStore();
  const [scene, setScene] = useState<TScene>([]);
  const [showIndex, setShowIndex] = useState(1);
  const sceneLoader = scene.slice(0, showIndex);
  const lastIsString = typeof sceneLoader[showIndex - 1] === "string";

  useEffect(() => {
    setShowIndex(1);
    setScene(screenplay[select]);
  }, [select]);

  const handleNext = () => {
    if (!lastIsString) {
      return;
    }
    setShowIndex((idx) => idx + 1);
  };

  return (
    <div className="p-2 flex flex-col items-center w-full">
      {sceneLoader.map((item, idx) => (
        <SceneItem key={idx} scene={item} />
      ))}
      {lastIsString && (
        <Button className="fixed bottom-4 w-5/6" onClick={handleNext}>
          下一步
        </Button>
      )}
    </div>
  );
};

const SceneItem = ({ scene }: { scene: string | TAction }) => {
  const { setSelect } = useStore();
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

  if (scene.action === "select") {
    return (
      <div className="flex flex-col w-full mt-3">
        {scene.timeout && <Countdown count={scene.timeout} />}
        {scene.data &&
          scene.data.map((action) => (
            <Button
              key={action[0]}
              className="mb-2"
              onClick={() => setSelect(action[1])}
            >
              {action[0]}
            </Button>
          ))}
      </div>
    );
  }

  return <p>Error!</p>;
};
