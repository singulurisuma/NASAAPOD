# GSNASA
This is a mini app named GSNASA that uses Nasa APOD apis to fetch the images and viedos and their explanation 
### Features and Screens
GSNASA has simple UI of HomeTab , FavoritesTab,Details screen
#### Hometab
Hometab screen has list of images where we can view the latest image and some randomly generated images which helps in keeping the user engaged in this screen.To generate new images or viedos user can PULL DOWN the flat list which generates new set of images or videos in the list.User can see the date and two line of the explanation in the card view to see the full image and explanation user can click on the image to navigate to the details screen.In offline mode last fetched days image is shown with details
#### Details Screen
In details screen user can view the image,read complete explanation and user can add it to favorites by clicking on the love button . User can remove this from favorites by reclicking on the love button . This has scroll enable to accompany long explanations.
#### Favorites Screen
Favorites Screen has tile view to see all the favorites add by the user. This screen is available offline and uses asyncstorage to achieve this and redux to achieve the dynamic adding and removal of favorites data.



