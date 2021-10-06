import React from "react";
import Store from "@/store";
import { TextLoader } from "@/components/TextLoader";

export default function Outext() {
  return (
    <Store>
      <div className="w-screen h-screen overflow-hidden bg-gray-700 text-white">
        <div className="container mx-auto">
          <TextLoader />
        </div>
      </div>
    </Store>
  );
}
