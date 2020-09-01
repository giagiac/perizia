import {
    callApi,
    loadIdToken
} from "../utils/apiUtils";

export function postPerizia(body) {
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    };

    return callApi(
        "/perizia",
        config,
        datiRequest,
        datiSuccess,
        datiFailure
    );
}


export function dati() {
    const idToken = loadIdToken();
    const config = {
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        }
    };

    return callApi(
        "/crud",
        config,
        datiRequest,
        datiSuccess,
        datiFailure
    );
}

export function datiPost(body) {
    const idToken = loadIdToken();
    const config = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        body
    };

    return callApi(
        "/crud",
        config,
        datiRequest,
        datiSuccess,
        datiFailure
    );
}

export const DATI_REQUEST = "DATI_REQUEST";
export const DATI_SUCCESS = "DATI_SUCCESS";
export const DATI_FAILURE = "DATI_FAILURE";

function datiRequest() {
    return {
        type: DATI_REQUEST
    };
}

function datiSuccess(payload) {
    console.log(payload)
    return {
        type: DATI_SUCCESS,
        dati: payload
    };
}

function datiFailure(error) {
    return {
        type: DATI_FAILURE,
        error
    };
}