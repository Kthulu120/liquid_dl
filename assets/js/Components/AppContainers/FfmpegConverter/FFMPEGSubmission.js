/**
 * Created by Troy on 8/13/2017.
 */
import store from '../../../store/globalstore'
import ErrorNotificationFactory from './factories/NotificationFactory'
import $ from 'jquery'


export const FFMPEGFormValidation = () => {
  const state = store.getState();
    try {
        $.ajax({

            url: 'http://127.0.0.1:8000/api',
            type: 'GET',
            data: {
                inputFormat: state.inputFormat,
                outputFormat: state.outputFormat,
                convertFolder: state.folderConversion,
                deleteOldFiles: state.deleteoldfiles,
                inputPath: state.input_path,
                outputPath: state.output_path,
            },
            dataType: 'json',
            success: function (response) {
                
                },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    }
    catch (e) {
        console.log(e)
    }
};