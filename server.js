const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const togeojson = require("@mapbox/togeojson");
const DOMParser = require("xmldom").DOMParser;

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static(".")); // damit index.html erreichbar ist

app.post("/upload", upload.single("gpxfile"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Keine Datei hochgeladen.");
    }

    const gpxContent = fs.readFileSync(req.file.path, "utf-8");
    const gpxDom = new DOMParser().parseFromString(gpxContent, "text/xml");
    const geojson = togeojson.gpx(gpxDom);

    const outputPath = path.join(__dirname, "output.geojson");
    fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2));

    // Aufräumen: temporäre Upload-Datei löschen
    fs.unlinkSync(req.file.path);

    res.send(
        "Datei erfolgreich umgewandelt und gespeichert als output.geojson"
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
