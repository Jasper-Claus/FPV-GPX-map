document.getElementById("upload").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("Bitte wähle eine Datei aus.");
        return;
    }

    const formData = new FormData();
    formData.append("gpxfile", file);

    try {
        const res = await fetch("/upload", {
            method: "POST",
            body: formData,
        });

        const result = await res.text();
        alert(result); 
    } catch (err) {
        console.error("Fehler beim Upload:", err);
        alert("Upload fehlgeschlagen.");
    }
});
