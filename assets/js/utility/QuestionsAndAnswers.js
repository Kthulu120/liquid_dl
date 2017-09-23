export const QuestionAndAnswers = [
    {
        question: "Why isn't Liquid-DL launching commands when I attempt to execute them",
        answer: "Typically this means that you need to reconfigure your settings since the browser uses localStorage to be safe but currently" +
        " we simply send the request the to the server ip(or localhost aka '127.0.0.1' and port if your issues are alleviated then put in an issue on github and I'll respond."
    },
    {
        question: "Hey I looked at the commands being executed and you've formatted them wrong and/or improperly configured them",
        answer: "To be honest this very likely the case as this application has only been tested on one machine, therefore put in a issue with the proper implementation of the command" +
        "needed along with a screenshot or log of the command that seems to be an issue or not exist and we'll get on it"
    },
    {
        question: "For some reason commands are not found",
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
        question: "Why doesn't youtube-dl support non-youtube sites?",
        answer: "We're addressing that in upcoming commits since each sites response for getting the formats is a little different meaning we have to write custom solutions for these sites"
    },
    {
        question: "Youtube-dl is not working nor are my files downloading",
        answer: "Well chances are that this is due to us going the multi-thread route due to just wanting to test it out, create an isue with any output logs you may have and we'll help resolve the issue and also address it in upcoming commits"
    },
    {
        question: "Can we donate to this project for being dope as hell?",
        answer: "Nah, honestly donate it to actual important things affecting actual people's lives"
    },
];

/**
 * List of providers which we currently have googled logos for (like legit), this list is passed into the
 * SubscriptionCreationModal.
 * @type {[*]}
 */
export const SubscriptionProvders = [
    {label: "Youtube", value: "youtube"},
    {label: "Adult Swim", value: "adultswim"},
    {label: "Aljazeera", value: "aljezeera"},
    {label: "AMC Netowrks", value: "amcnetworks"},
    {label: "Bandcamp", value: "bandcamp"},
    {label: "BBC", value: "bbc"},
    {label: "CNN", value: "cnn"},
    {label: "Comedy Central", value: "comedycentral"},
    {label: "Crunchyroll", value: "crunchyroll"},
    {label: "C-SPAN", value: "cspan"},
    {label: "CW-TV", value: "cwtv"},
    {label: "Dailymail", value: "dailymail"},
    {label: "Dailymotion", value: "Dailymotion"},
    {label: "Discovery", value: "discovery"},
    {label: "Disney", value: "disney"},
    {label: "Facebook", value: "facebook"},
    {label: "Fox Sports", value: "foxsports"},
    {label: "FX", value: "fx"},
    {label: "Game Informer", value: "gameinformer"},
    {label: "Gfycat", value: "gfycat"},
    {label: "go90", value: "go90"},
    {label: "GodTube", value: "godtube"},
    {label: "HBO", value: "hbo"},
    {label: "HellPorno", value: "hellporno"},
    {label: "Historic Films", value: "historicfilms"},
    {label: "Hot New Hiphop", value: "hotnewhiphop"},
    {label: "HowStuffWorks", value: "howstuffworks"},
    {label: "IGN", value: "ign"},
    {label: "IMDB", value: "imdb"},
    {label: "Instagram", value: "instagram"},
    {label: "KeezMovies", value: "keezmovies"},
    {label: "Khan Academy", value: "Khan Academy"},
    {label: "Kickstarter", value: "kickstarter"},
    {label: "Liveleak", value: "liveleak"},
    {label: "Library of Congress", value: "loc"},
    {label: "Love HomePorn", value: "lovehomeporn"},
    {label: "Lynda", value: "lynda"},
    {label: "MLB", value: "mlb"},
    {label: "Morningstar", value: "morningstar"},
    {label: "MTV", value: "mtv"},
    {label: "MVA", value: "mva"},
    {label: "MySpace", value: "myspace"},
    {label: "Vice", value: "vice"}


];