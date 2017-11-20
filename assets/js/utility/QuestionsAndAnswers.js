/**
 * The Questions and Answers are simple Q&A questions users may have along with appropriate answers
 * @type {[*]}
 */
export const QuestionAndAnswers = [

    {
        question: "Why isn't Liquid-DL launching commands when I attempt to execute them",
        answer: "Open the developer console and try and check the network to make sure requests are going to the correct port"
    },

    {
        question: "Hey I looked at the commands being executed and you've formatted them wrong and/or improperly configured them",
        answer: "To be honest this very likely the case as this application has only been tested on one machine, therefore put in a issue with the proper implementation of the command" +
        "needed along with a screenshot or log of the command that seems to be an issue or not exist and we'll get on it"
    },
    {
        question: "For some reason commands are not found",
        answer: "Well wget and ffmpeg must be downloaded for Windows since its standard on most Linux architectures, make sure you have youtube-dl and FFmpeg downloaded." +
        " These must be in the path so Liquid-DL can execute them"
    },
    {
        question: "Why aren't there more settings and customization for youtube-dl",
        answer: "Currently the simple configuration of this application allows for basic commands but put in a feature request and we'll happily oblige or " +
        "even better fork and build it yourself so we can merge it to the master branch"
    },
    {
        question: "These Settings aren't working",
        answer: "We haven't made them work yet"
    },
    {
        question: "Why isn't CloudCmd password protected, you trynna let my PC get borked?",
        answer: "No, which is why we advise you to edit the setting.json file and modify the port to limit port attacks, more importantly cloudcmd is served by the localhost therefore only Liquid-dl should be able to see it or user's on the network at max. But we plan to " +
        " up security when it comes to this aspect"
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
        "improve what you can even if it's syntax, writing documentation or to increase the verbosity of the variables so it's more readable"
    },
    {
        question: "Why doesn't youtube-dl support some non-youtube sites that are officially supported by youtube-dl?",
        answer: "I'll be adding in the last few sites soon enough"
    },
    {
        question: "Youtube-dl is not working nor are my files downloading",
        answer: "We moved to a single threaded method of downloading everything due to the fact that we use sqlite and windows file reading and writing locking features were annoying"
    },
    {
        question: "Noticed (insert logo here) in this application",
        answer: "Only Official Sponsors located in the Github repo endorse this application, all other included logo and their respective entities are not affiliated, sponsor , nor endorse this application. Their logos are merely here as graphic to interpret the application easier allowing for those with disabilities to more easily distinguish things"
    },
    {
        question: "Can we donate to this project for being dope as hell?",
        answer: "Yes I appreciate it alot, recently I've opened up the application to donations simply goto the github the donate button is at the button" +
        " but I appreciate simple stars on github too"
    },
    {
        question: "Whats the reason for life",
        answer: "To do dope things. That simple"
    },
    {
        question: "Did you like that new Jaden Smith Album",
        answer: "I would say Syre is a multi-tiered album in the levels of production and that Jaden Smith encapsulates that sound very well" +
        "most artist have that initial phase of being bad so you never hear it, like Drake's first couple albums but Jaden has had to deal with people listening to those initial bad albums," +
        "therefore he gets a bad wrap but to me Syre is his first foray into the wild wild west of music(excuse the pun). So yes its a very nice album to me"
    },
];

/**
 * List of providers which we currently have googled logos for (like legit) the sites are from the official youtube-dl site, this list is passed into the
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
    {label: "LoveHomePorn", value: "lovehomeporn"},
    {label: "Lynda", value: "lynda"},
    {label: "MLB", value: "mlb"},
    {label: "Morningstar", value: "morningstar"},
    {label: "MTV", value: "mtv"},
    {label: "MVA", value: "mva"},
    {label: "MySpace", value: "myspace"},
    {label: "Vice", value: "vice"},
    {label: "NatGeo", value: "natgeo"},
    {label: "NBA", value: "nba"},
    {label: "NBC", value: "nbc"},
    {label: "NBC News", value: "nbcnews"},
    {label: "NFL", value: "nfl"},
    {label: "NHL", value: "nhl"},
    {label: "Nick", value: "nick"},
    {label: "Nintendo", value: "nintendo"},
    {label: "PBS", value: "pbs"},
    {label: "Periscope", value: "periscopr"},
    {label: "Photobucket", value: "photobucket"},
    {label: "Google+", value: "googleplus"},
    {label: "Pokemon", value: "pokemon"},
    {label: "PornCom", value: "porncom"},
    {label: "Pornhub", value: "pornhub"},
    {label: "Reddit", value: "reddit"},
    {label: "RedTube", value: "redtube"},
    {label: "Reuters", value: "reuters"},
    {label: "RulePorn", value: "ruleporn"},
    {label: "SpankBang", value: "spankbang"},
    {label: "Spankwire", value: "spankwire"},
    {label: "Spike", value: "spike"},
    {label: "Sprout", value: "sprout"},
    {label: "Steam", value: "steam"},
    {label: "TMZ", value: "tmz"},
    {label: "Tosh.O", value: "tosh"},
    {label: "TruTVV", value: "truetv"},
    {label: "Tumblr", value: "tumblr"},
    {label: "Twitch", value: "twitch"},
    {label: "Udemy", value: "udemy"},
    {label: "VH1", value: "vh1"},
    {label: "Yahoo", value: "yahoo"},


];