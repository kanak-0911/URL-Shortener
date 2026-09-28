const button = document.getElementById("shortenBtn");
const urlInput = document.getElementById("longUrl");
const result = document.getElementById("result");
const clearButton = document.getElementById("clearBtn");

button.addEventListener("click", async function () {
    const longUrl = urlInput.value.trim();

    if (longUrl === "") {
        alert("Please enter a URL.");
        return;
    }

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
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

        if (!response.ok) {
            alert(data.message || "Something went wrong.");
            return;
        }

        const shortUrl = window.location.origin + "/" + data.shortId;
        urlInput.value = "";

        result.innerHTML =
            '<div class="result-box">' +
                '<p class="result-title">Your Short URL</p>' +
                '<a href="' + shortUrl + '" target="_blank" class="short-url">' +
                    shortUrl +
                '</a>' +
                '<br><br>' +
                '<button class="copy-btn" onclick="copyUrl(\'' + shortUrl + '\')">' +
                    'Copy' +
                '</button>' +
            '</div>';

    } catch (error) {
        alert("Unable to connect to the server.");
    }
});

function copyUrl(url) {
    navigator.clipboard.writeText(url);
    alert("Short URL copied!");
}

clearButton.addEventListener("click", function () {
    urlInput.value = "";
    result.innerHTML = "";
});

urlInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        button.click();
    }
});
