import { server } from "../../server";
import axios from "axios";


// create event 
export const createEvent = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest",
        });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`${server}/event/create-event`, newForm, config);
        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        })
    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message,
        })
    }
}