import React, { useState, useEffect, SetStateAction } from "react";
import {
  AIPicker,
  ColorPicker,
  Tab,
  FilePicker,
  Button,
} from "../../components/";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../../store";
import config from "../../config/config";
import {
  downloadCanvasToImage,
  reader,
  nullCheck,
  isString,
  createTimestamp,
} from "../../config/helpers";
import { download as Download, download } from "../../assets";
import { DecalTypes, EditorTabs, FilterTabs } from "../../config/constants";
import { fadeAnimation, slideAnimation } from "../../config/motion";
const Customizer = () => {
  const snap = useSnapshot(state);
  const [AIprompt, setAIprompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState<{
    [key: string]: boolean;
  }>({
    logoShirt: true,
    stylishShirt: false,
  });
  const [loadingImg, setLoadingImg] = useState(false);

  // show tab content based on state
  const activeEditorTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
            resetFile={resetFileTarget}
          />
        );
      case "aipicker":
        return (
          <AIPicker
            prompt={AIprompt}
            setPrompt={setAIprompt}
            isLoading={loadingImg}
            submit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };
  // Submit the prompt to openai
  const handleSubmit = async (type: string) => {
    // if no prompt then return
    if (!AIprompt) return;
    try {
      // set loading state, call the api, execute data injection
      setLoadingImg((prev) => !prev);

      type AIImageServerRequest = {
        prompt: string;
        format: "b64_json" | "url";
        size?: "256x256" | "512x512" | "1024x1024";
      };
      type AIImageServerResponse = {
        image: string;
        format: "b64_json" | "url";
      };

      const ImageReq: AIImageServerRequest = {
        prompt: AIprompt,
        format: "b64_json",
        size: "1024x1024",
      };

      const imageData = await fetch(
        "http://localhost:9000/img-gen/dalle/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ImageReq),
        }
      )
        .then((response) => response.json())
        .then((data: AIImageServerResponse) => {
          const { image, format } = data;
          console.log("Data from server:", image); // Process the response data
          // Find out which decal needs to be applied

          if (type === "Base")
            handleDecals("full", `data:image/png;base64,${image}`);
          if (type === "Logo")
            handleDecals("logo", `data:image/png;base64,${image}`);
        })
        .catch((error) => {
          console.log(error); // Handle any errors
        });
    } catch (error) {
      // Send error if possible
      console.error(error);
      alert(error);
    } finally {
      // After all is done, unset loading
      setLoadingImg((prev) => !prev);
      // reset Prompt
      setAIprompt("");
    }
  };

  const readFile = (type: string) => {
    if (nullCheck(file))
      reader(file).then((res) => {
        handleDecals(type, res);
        setActiveEditorTab((prev) => "");
      });
  };

  const resetFileTarget = () => {
    setFile(null);
    setActiveEditorTab((prev) => "");
  };
  const handleDecals = (
    type: string,
    res: string | unknown,
    resetTarget?: string
  ) => {
    const decalType = DecalTypes[type];
    console.log("res", res, "type", type, "decaltype", decalType);

  
    const fileTarget =
      decalType.stateProperty === "fullDecal" ? "fullDecal" : "logoDecal";

    // Reset  Case
    if (!isString(res)) return;

    const filterProp =
    decalType.filterTab === "logoShirt" ? "logoShirt" : "stylishShirt";

    if (resetTarget) {
      // reset state to blank
      state[fileTarget] = "";
      return
    }

    state[fileTarget] = res;

    if (!activeFilterTab[filterProp]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (_tab: string) => {
    // Find tab, change state
    switch (_tab) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[_tab];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[_tab];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prev: any) => {
      return {
        ...prev,
        [_tab]: !prev[_tab],
      };
    });
  };

  return (
    <AnimatePresence>
      {!snap.home && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handler={() =>
                      setActiveEditorTab((prev) =>
                        prev === tab.name ? "" : tab.name
                      )
                    }
                    isActive={false}
                  />
                ))}
                {activeEditorTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Button
              type="filled"
              text="Back"
              handler={() => {
                state.home = true;
              }}
              styles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            {...slideAnimation("up")}
            className="filtertabs-container"
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handler={() => handleActiveFilterTab(tab.name)}
                isFilter
                isActive={activeFilterTab[tab.name] === true ? true : false}
              />
            ))}
            <motion.div
              key="download"
              className={`tab-btn rounded-full glassmorphism: rounded-4`}
              onClick={() =>
                downloadCanvasToImage(`ai-tee_${createTimestamp()}`)
              }
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={download}
                alt={"Download Custom Shirt Image"}
                className={`${"w-2/3 h-2/3"}`}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
