import { Logger } from "tslog";
import { createStream } from "rotating-file-stream";

const stream = createStream("logs.json", {
  size: "10M", // rotate every 10 MegaBytes written
  compress: "gzip", // compress rotated files
});

// const generateFilename = (timestamp:Date, logType:string): string => {
//     if(!timestamp) return "logger"

//     const min = timestamp.getMinutes()
//     const hour = timestamp.getHours()
//     const day = timestamp.getDay()
//     const month = timestamp.getMonth()
//     const year = timestamp.getUTCFullYear()

//     return `${year}-${month}-${day}-${hour}-${min}.log`
// }

export const Log = new Logger();

Log.attachTransport((logObj) => {
  stream.write(JSON.stringify(logObj) + "\n");
});

Log.debug("I am a debug log.");
Log.info("I am an info log.");
Log.warn("I am a warn log with a json object:", { foo: "bar" });