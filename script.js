const API_KEY = "be64d21e8bmsh1bc53573f5dee47p1d2e5ajsnede3dd144b11";

        async function translateText() {
            const text = document.getElementById("inputText").value.trim();
            const source = document.getElementById("sourceLang").value;
            const target = document.getElementById("targetLang").value;

            if (!text) {
                alert("Please enter text to translate.");
                return;
            }

            const url = "https://google-api31.p.rapidapi.com/translate";
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-key": API_KEY,
                    "x-rapidapi-host": "google-api31.p.rapidapi.com"
                },
                body: JSON.stringify({
                    text: text,
                    to: target,
                    from_lang: source
                })
            };

            try {
                document.getElementById("outputText").innerText = "Translating...";
                const response = await fetch(url, options);
                const result = await response.json();
                console.log("API result:", result);

                if (result && result.length > 0 && result[0].translated) {
                    document.getElementById("outputText").innerText = result[0].translated;
                } else {
                    document.getElementById("outputText").innerText = "Translation failed. Check API response.";
                }
            } catch (error) {
                console.error("Translation error:", error);
                document.getElementById("outputText").innerText = "Error during translation. See console.";
            }
        }

        function copyText() {
            const output = document.getElementById("outputText").innerText;
            if (output && output !== "Your translation will appear here..." && output !== "Translating...") {
                navigator.clipboard.writeText(output).then(() => {
                    alert("Translation copied to clipboard!");
                });
            } else {
                alert("No translated text to copy.");
            }
        }

        function speakText() {
            const text = document.getElementById("outputText").innerText;
            if (text && text !== "Your translation will appear here..." && text !== "Translating...") {
                const utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);
            } else {
                alert("No translated text to speak.");
            }
        }

        function clearInput() {
            document.getElementById("inputText").value = "";
            document.getElementById("outputText").innerText = "Your translation will appear here...";
        }

        function startSpeechToText() {
            if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
                alert("Speech Recognition not supported in this browser.");
                return;
            }
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById("inputText").value = transcript;
            };

            recognition.onerror = function (event) {
                alert("Speech recognition error: " + event.error);
            };
        }