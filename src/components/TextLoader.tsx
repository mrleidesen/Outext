import React, { useEffect, useState, FC } from "react";

import { useStore } from "@/store";
import { text } from "@/data";
import { TScene } from "@/types";
import { Button } from "./Button";

export const TextLoader = () => {
  const { select, setSelect } = useStore();
  const [scene, setScene] = useState<TScene>([]);
  const [showIndex, setShowIndex] = useState(1);
  const sceneLoader = scene.slice(0, showIndex);
  const lastIsString = typeof sceneLoader[showIndex - 1] === "string";

  useEffect(() => {
    setShowIndex(1);
    setScene(text[select]);
  }, [select]);

  const handleNext = () => {
    if (!lastIsString) {
      return;
    }
    setShowIndex((idx) => idx + 1);
  };

  return (
    <div className="p-2 flex flex-col items-center">
      {sceneLoader.map((item, idx) => {
        if (typeof item === "string") {
          return (
            <p key={idx} className="text-center mb-1.5">
              {item}
            </p>
          );
        }

        if (item.action === "select") {
          return (
            <div key={idx} className="flex flex-col">
              {item.data &&
                item.data.map((action) => (
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
      })}
      {lastIsString && (
        <Button className="fixed bottom-4 w-5/6" onClick={handleNext}>
          下一步
        </Button>
      )}
    </div>
  );
};
