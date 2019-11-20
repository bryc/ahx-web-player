# AHX Web Music Player
A web interface demonstrating AHX playback in JS using Web Audio API, IndexedDB and JSZip. Tested in Chrome/Firefox.

AHX (Abyss Highest eXperience) is a tracker music format dating back to 1995-1997 on the Amiga. It is completely synthetic and designed to sound like C64 chiptunes. The music files are quite small.

Many thanks go to bartman/abyss for his AHX javascript replayer source. It hasn't been updated
and was only ever released [here](http://www.pouet.net/prod.php?which=58154)
and [here](http://www.pouet.net/prod.php?which=58260) back in 2011. I did a number of quick patches to allow all AHX and AHX2 files to work. If there is a better version somewhere, let me know and I'll include it! AHX was originally made by dexter/abyss and pink/abyss.

### Usage
You'll first want to download the repository and run index.html (or download only [AHX.zip](https://github.com/bryc/ahx-web-player/raw/master/AHX.zip) and use the live version [here](http://bryc.github.io/ahx-web-player/index.html)). Drag over the `AHX.zip` file over the page to load/unpack all the tunes into the internal database (using IndexedDB API).

`AHX.zip` contains a collection of AHX tunes (1000+ files) from various sources, mostly Modland/AMP.
