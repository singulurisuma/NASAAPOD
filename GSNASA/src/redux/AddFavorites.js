import remove from 'lodash.remove'
 import Realm from "realm";

 import { recievedFavorites,favorites_schema } from '../realmdb/realmschema'
var initialstate = [];

//Code for storing the favorites into realm db
// Realm.open({
//   schema: [recievedFavorites]
// }).then(realm => {
//   var tasks = realm.objects(favorites_schema);
//     initialstate.push(tasks[0])
// });
// const deleteFavourites =async(action)=>{
//   Realm.open({
//     schema: [recievedFavorites]
//   }).then(realm => {
//     realm.write(() => {
//       var tasks = realm.objects(favorites_schema).filter(obj => {
//         return obj.date === action.details
//       })   
//     });  
//   });
// }
// const addedtoFavourites =async(action)=>{
//   Realm.open({
//     schema: [recievedFavorites]
//   }).then(realm => {
//     realm.write(() => {
//       realm.create(favorites_schema,{
//                 date: action.details.date,
//                 explanation:action.details.explanation,
//                 media_type: action.details.media_type,
//                 title:action.details.title,
//                 url:action.details.url
//               } );
//     });
//   });
//}

//Reducer to add add and remove favorites
function AddFavorites(state = initialstate, action) {

    switch(action.type) {
      case 'ADDEDFAV':
        return [
          ...state,  
          action.details        
      ]
      case 'REMOVEDFAV':
        const deleteNewArray = remove(state, obj => {
          return obj.date != action.details
      })
      
      return deleteNewArray
      case 'SETINITAL':
      return action.details
      default:
        return state;
    }
  }

export default AddFavorites;