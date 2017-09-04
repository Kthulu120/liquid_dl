export const QuestionAndAnswers = [
    {
        question: "Why isn't Liquid-DL launching commands when I attempt to execute them",
        answer: "Typically this means that you need to reconfigure your settings since the browser uses localStorage to be safe but currently" +
        " we simply send the request the to the server ip(or localhost aka '127.0.0.1' and port if your issues are alleviated then put in an issue on github and I'll respond."
    },
    {
        question: "For some reasno commands are not found",
        answer: "Well wget must be downloaded for Windows since its standard on most Linux architectures, make sure you have youtube-dl and FFmpeg downloaded." +
        " These must be in the path so Liquid-DL can execute them; like what Chip Kelly did to the Eagles"
    },
    {
        question: "Why aren't there more settings and customization for youtube-dl",
        answer: "Currently the simple configuration of this application allows for basic commands but put in a feature request and we'll happily oblige or " +
        "even better fork and build it yourself so we can merge it to the master branch"
    },
    {
        question: "Will you support (insert application here)?",
        answer: "Put in the request and we can try or if you implement and document it your code we'll merge it into the master branch"
    },
    {
        question: "This video or file isn't downloading or giving me issues",
        answer: "Check your logs and see what went wrong if it's because of the lack of a command or issue relating to Liquid-DL open an issue on github so we can resolve it"
    },
    {
        question: "Why isn't (insert format here) available for ffmpeg?",
        answer: "Honestly, we probably didn't know it was a thing or we forgot"
    },
    {
        question: "Can anyone contribute?",
        answer: "Of course, in fact if your a new programmer with a python or react background look at the code its a bit messy but " +
        "improve what you can even if it's syntax or to increase the verbosity of the variables so it's more readable"
    },
    {
        question: "Can we donate to this project for being dope as hell?",
        answer: "Nah, honestly donate it to actual important things affecting actual people's lives"
    },
];