#R-N-R


_Everything isn't like home.  If everything were like home, there would be no reason for leaving home._  
- Clark Griswold

Ever spent time thinking where to go for a weekend or weeks even?  The world is getting smaller and more connected with the advancement of web-based technology and we're constantly inundated with images of tropical paradises, wintry havens, vineyard getaways, or flashes of cosmopolitan appeal.  So many places, so little time.  What do you do?

Well,

RnR is an app that uses your Instagram account to decide how to spend your well-earned vacations.  Our group app uses Instagram's API to filter through the likes of many images that you've liked and presents some suggestions based on the results.

###But! it doesn't stop there:

RnR allows you to organize your vacation destination ideas into collections for your next and future vacation plans.

In addition, RnR gives you Google map directions to your saved locations so that you can see what sites might be nearby, where to visit when you're finally there, and maybe connect a couple of local destinations all into one stay.

App Screenshot:  
![RNR](https://raw.githubusercontent.com/Ishmaru/rnr/master/public/images/rnr_screenshot.jpg)
_Roam Around the World_ - B-52's

##Trello
[Trello] (https://trello.com/b/TRRC7VJK/rnr)  

##To RNR and Beyond  

[RNR] (https://enigmatic-inlet-27771.herokuapp.com/)  

##Team RnR  
> Adrian D.  
> Jacob A.  
> Christian Z.  


##Technologies
Some of the technologies we've utilized and implemented in the development of our RnR app are:  

#### Front-End  
>- HTML5 / CSS3  
>- *Materialize* framework
>- jQuery  
>- Vanilla Javascript

####Back-End  
>- OAuth 2.0  
>- Passport  
>- Lodash
>- _Instagram_ API  
>- _Google Map_ API
>- Express
>- Mongoose
>- MongoDB
>- Node.js
>- Locus

####Many Thanks and Gratitude to the Contributors...
>- [Ezra Raez](https://github.com/EARnagram)        
>- [Jim Clark](https://github.com/jim-clark) 
>* Anyone who puts up with us and our craziness  


## RNR API

#### Note you need to be logged in to via instagram use our API.

### Api/likes  
Lists an array of your latest likes and their data. Each liked item is an array of vaues.

`likes[[imgUrl, { latitude, name, longitude, id }, uploader], [imgUrl, { latitude, name, longitude, id }, uploader] ...]`

#### End points: 

|Routes|HTTP|
|:--:|:--:|
|likes|/api/likes|
|show like|/api/likes/id|

#### Index Values:
#####Note: A given like will return as an array of values.

|index|Use|
|:--:|:--:|
|[0]|Img Source URL|
|[1]|A location Object|
|[2]|Uploader Name|

#### Key Values:

|Key Value|Use|
|:--|:--:|
|.latitude|Image latitude value|
|.longitude|Image Longitude value|
|.name|Location name|
|.id|Instagram post id|

#####Note: Some Instagram Posts may not contain location data. In this case `likes[<index of like>][1]` will return _null_ instead of an empty object.

### RNR's Future

So much to add, so little time to do it in...but Instagram's API, shall we say, peculiar.
	