/**
 * Created by Troy on 8/13/2017.
 */


const getValidFormatTypes = (formatType) => {
    let format = null;
    let ifVideo = (formatType === 'video') ? format=['video', 'audio'] : null;
    let ifImage = (formatType === 'image') ? format=['image'] : null;
    let ifAudio = (formatType === 'audio') ? format=['audio'] : null;
    return format
};


const filterByCategory = (formatTypes, listOfFormatChoices) => {
    let approvedChoices = [];
    for(let i =0; i < listOfFormatChoices.length; i++){
        if ((formatTypes.includes(listOfFormatChoices[i]['category']))){
            approvedChoices.push(listOfFormatChoices[i])
        }
    }
    return approvedChoices
};

export const FFMPEGExportList = (list, formatChoice) => {
    let formatTypes = getValidFormatTypes(formatChoice);
    return (filterByCategory(formatTypes, list))

};

