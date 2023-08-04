import React from "react";
import Button from "../Button";

interface Props {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  submit: (type:string) => void;
}
const index: React.FC<Props> = ({ prompt, setPrompt, isLoading, submit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        name="aipicker-input"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        spellCheck
        placeholder="Message..."
      />
      <div className="">
        {/* Conditionally render either the 2 buttons or the full loading button */}
        {isLoading ? (
          <Button
            type="filled"
            text="Thinking..."
            handler={() => {}}
            styles="text-sm w-full bg-gray-500 text-center"
          />
        ) : (
          <div className="flex gap-3 flex-wrap">
            <Button
              type="outlined"
              text="Base"
              handler={() => submit('Base')}
              styles="text-sm"
            />
            <Button
              type="filled"
              text="Logo"
              handler={() => submit('Logo')}
              styles="text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
