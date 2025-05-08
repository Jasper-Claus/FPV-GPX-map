const togeojson = require("@mapbox/togeojson");
const { error } = require("console");
const Domparser = require("xmldom").DOMParser;
const fs = require("fs");

const config = {};

const args = process.argv.slice(2);

args.forEach((val) => {
    const flag = val.split("=");

    switch (flag[0]) {
        case "--input":
            config.input_file = flag[1];
            break;
        case "--output":
            config.output_file = flag[1];
            break;
    }
});

if (config.input_file) {
    const fileParsedFromDom = new Domparser().parseFromString(
        fs.readFileSync(config.input_file, "utf-8"),
        "text/xml"
    );

    const converted = togeojson.gpx(fileParsedFromDom);
    if (config.output_file) {
        fs.writeFile(config.output_file, JSON.stringify(converted), (error) => {
            if (error) {
                throw new Error(error);
            }
            console.log("success!!");
        });
    } else {
        throw new Error("output file not defined");
    }
} else {
    throw new Error("input file not defined");
}
