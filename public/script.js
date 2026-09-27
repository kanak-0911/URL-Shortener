const button = document.getElementById("shortenBtn");
const urlInput = document.getElementById("longUrl");
const result = document.getElementById("result");

const clearButton = document.getElementById("clearBtn");

button.addEventListener("click", async function() {
    const longUrl = urlInput.value;

        if (longUrl.trim() === "") {
        alert("Please enter a URL.");
        return;
    }

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
    alert("Please enter a valid URL.");
    return;
}

    const response = await fetch("/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            longUrl: longUrl
        })
    });

    const data = await response.json();

    const shortUrl = "http://localhost:3000/" + data.shortId;
    urlInput.value = "";

    result.innerHTML = `
        Your short URL:
        <a href="${shortUrl}" target="_blank">${shortUrl}</a>
        <br><br>
        <button onclick="copyUrl('${shortUrl}')">Copy</button>
    `;
});

function copyUrl(url) {
    navigator.clipboard.writeText(url);
    alert("Short URL copied!");
}

clearButton.addEventListener("click", function() {
    urlInput.value = "";
    result.innerHTML = "";
});

urlInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});