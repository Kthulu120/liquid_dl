const initialState = {
    context_menu_torrent: {
        "name": "The Hungry Hippo",
        "percent": "37.98",
        "status": "downloading",
        "upload_speed": "2.3 MB/s",
        "download_speed": "3.2 MB/s",
        "infohash": "f4f3894h3ohgw83h4t948ghf43a8r09phg90aef08q4h08377tg8thfdnche2890",
        "eta": "2m 15s",
        "tracker": "avistaz",
        "date_added": "5:00pm, 24 September, 2013",
        "location": "C;/tmp/toot",
        "downloaded": "32 MB",
        "uploaded": "12 MB",
        "ratio": ".54",
        "size": "73 MB",
        "tags": "books, stories",
        "creation_date": "September 12, 2015 5:12 PM"

    },
    filter_text: '',
    torrents: [{
        "name": "The Hungry Hippo",
        "percent": "37.98",
        "status": "downloading",
        "upload_speed": "2.3 MB/s",
        "download_speed": "3.2 MB/s",
        "infohash": "f4f3894h3ohgw83h4t948ghf43a8r09phg90aef08q4h08377tg8thfdnche2890",
        "eta": "2m 15s",
        "tracker": "avistaz",
        "date_added": "5:00pm, 24 September, 2013",
        "location": "C:/tmp/toot",
        "downloaded": "32 MB",
        "uploaded": "12 MB",
        "ratio": ".54",
        "size": "73 MB",
        "tags": "books, stories",
        "creation_date": "September 12, 2015 5:12 PM"

    },
        {
            "name": "Gah Damn!",
            "percent": "67.98",
            "status": "downloading",
            "upload_speed": "7.3 MB/s",
            "download_speed": "3.2 MB/s",
            "infohash": "f4f3894h3ohgw83hsjdbsjkbghf43a8r09phg90aef08q4h08377tg8thfdnche2890",
            "eta": "21m 15s",
            "tracker": "avistaz",
            "date_added": "5:00pm, 24 September, 2013",
            "location": "C;/tmp/toot",
            "downloaded": "65 MB",
            "uploaded": "23 MB",
            "ratio": ".54",
            "size": "73 MB"
        }],
    trackers: [],
    overall_upload_speed: "7.8 MB/s",
    overall_download_speed: "13 MB/s",
    status_filter: "none",
    torrent_detail_modal_visible: true,

};


const flood = (state = initialState, action) => {
    let new_global_state;
    switch (action.type) {
        case 'UPDATE_FLUID_CONTEXT_MENU':
            new_global_state = Object.assign({}, state, {context_menu_torrent: action.torrent});
            return new_global_state;
        case 'UPDATE_FLUID_TOR_DETAIL_VIS':
            new_global_state = Object.assign({}, state, {torrent_detail_modal_visible: action.is_visible});
            return new_global_state;
        case 'UPDATE_SERVER_IP':
            new_global_state = Object.assign({}, state, {server_ip: action.ip_address});
            window.localStorage.setItem("settings", new_global_state);
            return new_global_state;
        case 'UPDATE_SETTING_CHOICE':
            return Object.assign({}, state, {settings_choice: action.choice});
        default:
            return state
    }
};

export default flood