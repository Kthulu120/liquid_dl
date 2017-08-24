/**
 * Created by Troy on 8/12/2017.
 */
const fileformats = {
        video: [
            {category: "video", format: 'avi'},
            {category: "video", format: 'mp4'},
            {category: "video", format: 'gif'},
            {category: "video", format: 'wma'},
            {category: "video", format: 'webm'},
            {category: "video", format: 'webp'},

        ],
        image: [
            {category: "image", format: 'jpg'},
            {category: "image", format: 'jpeg'},
            {category: "image", format: 'gif'},
            {category: "image", format: 'png'},
            {category: "image", format: 'tiff'},
            {category: "image", format: 'psd'},
            {category: "image", format: 'pbm'},
            {category: "image", format: 'pgm'},
            {category: "image", format: 'ppm'},
        ],
        audio: [
            {category: "audio", format: 'mp3'},
            {category: "audio", format: 'aac'},
            {category: "audio", format: 'mp4'},
            {category: "audio", format: '3gpp'},
            {category: "audio", format: 'wma'},
            {category: "audio", format: 'caf'},
            {category: "audio", format: 'm4a'},
            {category: "audio", format: 'flac'},

        ]
    }
;

const initialState = {
    fileformats: fileformats,
    inputFormat: '',
    inputFormatCategory: 'video',
    input_path: '',
    output_path: '',
    folderConversion: false,
    deleteoldfiles: false,
    convertregardlessoftype: false,
    outputFormat: '',
    outputFormatCategory: '',

};


const ffmpeg = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT_PATH':
            return Object.assign({}, state, {input_path: action.path});
        case 'UPDATE_OUTPUT_PATH':
            return action.filter;
        case 'UPDATE_CONVERT_FOLDER':
            return action.filter;
        case 'UPDATE_DELETE_OLD_FILES':
            return Object.assign({}, state, {deleteoldfiles: action.deleteoldfiles});
        case 'UPDATE_INPUT_TYPE':
            return Object.assign({}, state, {inputFormat: action.format});
        case 'UPDATE_INPUT_CATEGORY':
            return Object.assign({}, state, {inputFormatCategory: action.category});
        case 'UPDATE_OUTPUT_TYPE':
            return Object.assign({}, state, {outputFormat: action.format});
        case 'UPDATE_OUTPUT_CATEGORY':
            return Object.assign({}, state, {outputFormatCategory: action.format});
        case 'UPDATE_FOLDER_CONVERSION':
            return Object.assign({}, state, {folderConversion: action.format});
        default:
            return state
    }
};

export default ffmpeg