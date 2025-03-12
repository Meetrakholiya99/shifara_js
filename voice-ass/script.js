let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning!");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

window.addEventListener("load", wishMe);

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, how can I assist you?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("search google")) {
        let query = message.replace("search google", "").trim();
        speak(`Searching Google for ${query}`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (message.includes("play music")) {
        speak("Playing music...");
        let musicLinks = [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "https://www.youtube.com/watch?v=3JZ4pnNtyxQ",
            "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
        ];
        window.open(musicLinks[Math.floor(Math.random() * musicLinks.length)], "_blank");
    } else if (message.includes("what time is it")) {
        let nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        speak("The current time is " + nowTime);
    } else if (message.includes("what is the date today")) {
        let nowDate = new Date().toLocaleDateString();
        speak("Today's date is " + nowDate);
    } else if (message.includes("search wikipedia")) {
        let query = message.replace("search wikipedia", "").trim();
        speak(`Searching Wikipedia for ${query}`);
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open WhatsApp")) {
        speak("Opening WhatsApp...");
        window.open("WhatsApp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else {
        let searchQuery = message.replace("shifra", "").replace("shipra", "").trim();
        let finalText = `This is what I found on the internet regarding ${searchQuery}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    }
}
