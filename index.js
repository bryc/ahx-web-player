var ahxMaster = AHXMaster(), ahxSong;

//window.onerror = function(msg, url, linenumber) {
//
//	alert('Line: '+linenumber+'\nMessage: '+msg+"\n\nSTOPPING PLAYBACK!");
//	ahxMaster.Stop();
//    return true;
//}
if(!localStorage.favs){localStorage.favs="{}"}

function addFav(e)
{
	
	var favs = JSON.parse(localStorage.favs);
	if(!favs[this.artist]){favs[this.artist]=[]}
	
	if( favs[this.artist].indexOf(this.path)=== -1  )
	{favs[this.artist].push(this.path);this.innerHTML='unfavorite';this.onclick = unFav;this.className='button favorited';}
	console.log(favs);
	
	localStorage.favs = JSON.stringify(favs);
}
function unFav()
{
	var favs = JSON.parse(localStorage.favs);
	
	var wut = favs[this.artist].indexOf(this.path);
	favs[this.artist].splice(wut,1)
	if(favs[this.artist].length==0)
	{
		delete favs[this.artist];
	}
	localStorage.favs = JSON.stringify(favs);
	this.onclick = addFav;
	this.innerHTML='favorite';
	this.className='button';
}
// playSong function. Assigned as an onClick function, this controls many things
function playSong()
{
    ahxMaster.Output.pos = [0,0,0,0];
	this.className = "song-item";
	this.fullPath = encodeURIComponent("AHX/" + this.artist + "/" + this.filePath + ".ahx"); // encodeURIComponent to ensure every file is accessible.
	ahxSong = new AHXSong(),
		t = this; // afaik this is the only way i can use "this" in the anonymous function below.
	ahxSong.LoadSong(this.fullPath, function ()
	{
		ahxMaster.Play(ahxSong);
		//ahxSong.SpeedMultiplier = 400
		// Sends song info data to the fixed panel.
		var currentSong = document.getElementById("song-info");
		currentSong.innerHTML = '<div id=title-playing>' + ahxSong.Name.split('\0')[0] + "</div> / " + t.artist + '<br>';
		var stopButton = document.createElement('span');
		stopButton.innerHTML='stop';
		stopButton.className='button';
		stopButton.onclick = function(){
			if(this.innerHTML=='stop')
			{
				ahxMaster.Stop();
				this.innerHTML='play';
			} else
			{
				ahxMaster.Play(ahxSong);
				this.innerHTML='stop';
			}
		}
		currentSong.appendChild(stopButton);
		var favButton = document.createElement('span');
		var Favz = JSON.parse(localStorage.favs || {});
		if(Favz[t.artist]!==undefined && Favz[t.artist].indexOf(t.filePath)!==-1  )
		{
			favButton.innerHTML='unfavorite';
			favButton.className='button favorited';
			favButton.onclick = unFav;
		} else
		{
			favButton.innerHTML='favorite';
			favButton.className='button';
			favButton.onclick = addFav;
		}
		favButton.artist=t.artist;
		favButton.path=t.filePath;
		favButton.songName=ahxSong.Name;
		
		currentSong.appendChild(favButton);

        var slider = document.createElement('input');
        slider.type = "range";
        slider.min = 0;
        slider.value = 0;
        slider.style.width = "250px";
        slider.title = ahxSong.PositionNr;
        slider.max = ahxSong.PositionNr-1;
        slider.onchange = function()
        {
            ahxMaster.Output.Player.PosNr = parseInt(this.value);
        }
        slider.onmouseup = function() { this.blur(); }
        
        clearInterval(lol);
		var lol = setInterval(function(){
            
            if(ahxMaster.Output.Player.Playing && slider !== document.activeElement)
            {
                slider.value = ahxMaster.Output.Player.PosNr;
            }
        }, 50);  

        
        currentSong.appendChild(slider);
        
        
        
		// My makeshift "selected state" handler. Highlights the currently playing song in the list.
		var j = document.querySelector('.song-item.selected'),
			h = document.querySelector('.song-list.selected');
		if (j){j.className = "song-item"}
		if (h){h.className = "song-list"}
		t.className = "song-item selected";
		t.parentNode.className = 'song-list selected';
	});
}
// This for loop iterates through the data; an object in which the keys represent the aritst names, with the property being an array of song titles.
// We use this data to build the actual song list interface, and use the strings to reproduce valid file paths.

var List = {};

var buildListfromFile = function()
{
    var x = this.responseText.split("\r\n");
    for (var i = 0; i < x.length; i++) {
        if (x[i].substr(-3) == "ahx") {
            var ap = x[i].split("AHX\\")[1].split(/\\(.+)?/);
			
            var artist = ap[0];
			
            var path = ap[1].slice(0, -4);
			
            if (!List[artist]) {
                List[artist] = [];
            }
            List[artist].push(path);
        }
    }
    createSongList(List);
}


var oReq = new XMLHttpRequest();
oReq.onload = buildListfromFile;
oReq.open("get", "dir.txt", true);
oReq.send();



function createSongList(_dirTree)
{
	if(typeof _dirTree=="string")
	{
		//var type=0
		_dirTree = JSON.parse(_dirTree);
	} else {
	var type = 1;
	var Favz = JSON.parse(localStorage.favs || {});
	}
	document.getElementById("song-list").innerHTML="";
	for (var artistName in _dirTree)
	{
		// div.Box
		var tehBox = document.createElement("div");
		tehBox.className = "artist-box";
		// div.Box > div.Artist
		var artistDiv = document.createElement("div");
		artistDiv.className = "artist-name";
		artistDiv.innerHTML = artistName;
		tehBox.appendChild(artistDiv);
		// div.Box > div.Scroll
		var scrollBox = document.createElement("div");
		scrollBox.className = "song-list";
		tehBox.appendChild(scrollBox);
		// div.Box > div.Scroll > div.Song
		for (var songID = 0, len = _dirTree[artistName].length; songID < len; songID++)
		{
			

			
			var songDiv = document.createElement("div"),
				fp = _dirTree[artistName][songID];
				//console.log(Favz[artistName]);
				if(type==1&&Favz[artistName]!==undefined && Favz[artistName].indexOf(fp)!==-1  )
				{
					songDiv.style.fontWeight=700;
					songDiv.style.color='green';
					songDiv.style.fontStyle='italic';
					songDiv.style.borderBottom='1px solid green';
				}
			songDiv.className = "song-item";
			songDiv.artist = artistName;  // We stash away the name of the artist as a property per-song in the element. Easier to access. 
			songDiv.filePath = fp;        // Same for the file path. And the title (below)
			songDiv._title = fp.slice(0, 5) !== "coop-" ? fp : fp.split("/")[1] + " (" + fp.split("/")[0] + ")";
			songDiv.innerHTML = songDiv._title;
			songDiv.onclick = playSong;   // onClick event controls the actual playing of the song.
			scrollBox.appendChild(songDiv);
		}
		document.getElementById("song-list").appendChild(tehBox);
	}
}



window.onload = function()
{
	var all = document.createElement('span');
	var fav = document.createElement('span');
	
	all.onclick = function(){
		createSongList(List);
		all.className = "list-button selected";
		fav.className = "list-button";
	}
	all.innerHTML = "all";
	all.className = "list-button selected";
	fav.className = "list-button";
	fav.innerHTML = "best";
	fav.onclick = function(){
	if(localStorage.favs){
		createSongList(localStorage.favs)
		fav.className = "list-button selected";
		all.className = "list-button";
	}
	}
	
	document.getElementById("nav").appendChild(all);
	document.getElementById("nav").appendChild(fav);
	
}