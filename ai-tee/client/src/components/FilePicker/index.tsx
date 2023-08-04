import React from "react";
import { Button } from "../";
import { nullCheck } from "../../config/helpers";
interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  readFile: (type: string) => void;
  resetFile: () => void;
}

const index = ({ file, setFile, readFile, resetFile }: Props) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if existing

    // if(!nullCheck(e.target.files![0])) return

    setFile((prev) => e.target.files![0]);
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="file-upload" className="cursor-pointter">
          Upload File
        </label>
        <p className="text-gray-500 text-sm truncate mt-2">
          {file ? `File Selected:\n${file.name}` : "No File Selected.."}
        </p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-6">
        <Button
          type="outlined"
          text="Graphic"
          handler={() => readFile("logo")}
          styles="text-sm"
        />
        <Button
          type="outlined"
          text="Base"
          handler={() => readFile("full")}
          styles="text-sm"
        />
      </div>
      <div className="">
      <Button
          type="outlined"
          text="Clear File"
          handler={() => resetFile()}
          styles="text-sm bg-gray-500"
        />
      </div>
    </div>
  );
};

export default index;
