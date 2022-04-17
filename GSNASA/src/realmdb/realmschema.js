import Realm from "realm";
export const favorites_schema="Favorites"
export const Todays_schema="TodaysImage"


export const recievedFavorites= {
    name:favorites_schema,
    properties: {
        date: "string",
        explanation:"string",
        media_type: "string",
        title:"string",
        url:"string"
    },
    primaryKey: "date"
};
export const Todaysdata= {
    name:Todays_schema,
    properties: {
        date: "string",
        explanation:"string",
        media_type: "string",
        title:"string",
        url:"string"
    },
    primaryKey: "date"
};