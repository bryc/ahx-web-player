# AHX Web Music Player

A web interface demonstrating AHX playback in JS. AHX (Abyss Highest eXperience) is a tracker music format dating back to the Amiga days. It is completely synthetic and designed to sound like C64 chiptunes. The music files are quite small.

Many thanks go to bartman/abyss for his AHX javascript replayer. It hasn't been updated
and was only ever released [here](http://www.pouet.net/prod.php?which=58154)
and [here](http://www.pouet.net/prod.php?which=58260) back in 2011. I did a number of quick patches to allow all AHX and AHX2 files to work. If there is a newer version somewhere, let me know and I'll include it!

![Screenshot](http://i.imgur.com/Ev71EW1.png)

### Usage
You'll first want to download the repository and extract the AHX folder from AHX.zip into the root directory (with the index.html).

`AHX.7z` contains a collection of AHX tunes (1000+ files) from various sources, mostly Modland/AMP. 
Unzip it into the /AHX/ folder to be used with the app. The song paths are stored in `dir.txt` and can be updated automatically using the included PowerShell script.

This is tested on on Firefox and Chrome. However due to browser security restrictions some functionality is disabled when running locally (i.e. running HTML file itself). It runs fine under a webserver - So host it, or use alternatives like [Mongoose](https://www.cesanta.com/products/binary) - its basically one exe that instantly starts a webserver in any folder its executed from. There are probably other apps like this, or if you have Python, use `python -m SimpleHTTPServer` in the root dir.

There _are_ ways to get around this: For Chrome, you can install it as a Chrome Web App, or close & restart your Chrome with the flags `--allow-file-access-from-files` or `--disable-web-security` (check `chrome://version` to verify any set flags).

In Firefox, it's easier: navigate to `about:config`, and set `security.fileuri.strict_origin_policy` to `false`. Hmm... apparently this isn't even required in the latest Firefox!
