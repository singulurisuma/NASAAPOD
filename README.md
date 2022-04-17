# GSNASA
This is a mini app named GSNASA that uses Nasa APOD apis to fetch the images and viedos and their explanation. user can add and manage his favorites
### Installation 
After git clone 
1. cd nasaapod<br>
2. cd gsnasa<br>
3. npm install <br>
4. react-native link<br>
4. react-native run-android<br>
### Features and Screens
GSNASA has simple UI of HomeTab,FavoritesTab,Details screen
#### Hometab
Hometab screen has list of images where user can view the latest image and some randomly generated images which helps in keeping the user engaged in this screen.To generate new images or viedos user can **PULL DOWN** the flat list which generates new set of images or videos in the list.User can see the date and few lines of the explanation in the card view .To see the full image and explanation user can click on the image to navigate to the details screen.In offline mode last fetched date's image is shown with details<br>
#### Search by date
User can search image or video of a particular date by using the calender button available on the top in home screen. After selecting a particular date user will be navigated to screen displaying the details and image content of that screen
#### Details Screen
In details screen user can view the image or viedo ,read complete explanation and user can add it to favorites by clicking on the love button . User can remove this from favorites by reclicking on the love button . This has scroll enable to accompany long explanations.
#### Favorites Screen
Favorites Screen has tile view to see all the favorites add by the user. This screen is available offline and uses asyncstorage to achieve this and redux to achieve the dynamic adding and removal of favorites data.If viedo content is added to the favorites then thumbnail is used for displaying in the tab screen 
#### Offline mode
If data is not available due to network issues . User can view only last fetched date's image and its details and can view and manage his favorites 
### Technology and platforms used
React Native CLI<br>
Android studio <br>
NASA Apis<br>
### Screenshots
##### HomeTab
<img src="https://github.com/singulurisuma/NASAAPOD/blob/main/GSNASA/readmeImages/Home1.png" width="300" height="500"></img><br>            <br>
<img src="https://github.com/singulurisuma/NASAAPOD/blob/main/GSNASA/readmeImages/Videohome.png" width="300" height="500"></img><br>
##### Search by date <br>
<img src="https://github.com/singulurisuma/NASAAPOD/blob/main/GSNASA/readmeImages/Date1.png" width="300" height="500"></img><br>
##### Details and explanation <br>
<img src="https://github.com/singulurisuma/NASAAPOD/blob/main/GSNASA/readmeImages/detailsvideo.png" width="300" height="500"></img><br>
##### Favorites <br>
<img src="https://github.com/singulurisuma/NASAAPOD/blob/main/GSNASA/readmeImages/favorites.png" width="300" height="500">



