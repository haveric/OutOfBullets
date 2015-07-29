var SoundManager = function() {
    this.sounds = [];
    this.volume = 0.5;
}

SoundManager.prototype.add = function(name, src, vol) {
    var sound = new Sound(name, src, vol);
    this.sounds.push(sound);
}

SoundManager.prototype.play = function(audioName, playVolume) {
    var self = this;
    
    if (!playVolume || playVolume == null) {
        playVolume = 1;
    }

    var length = self.sounds.length;
    for (var i = 0; i < length; i++) {
        var sound = self.sounds[i];
        if (sound.name === audioName) {
            var audio = new Audio(sound.src);
            var actualVolume = self.volume * sound.vol * playVolume;
            if (actualVolume > 1) {
                actualVolume = 1;
            } else if (actualVolume < 0) {
                actualVolume = 0;
            }
            
            audio.volume = actualVolume;
            audio.play();
            
            return audio;
        }
    }
    
    console.error("Audio not found: " + audioName);
}

SoundManager.prototype.setVolume = function(newVolume) {
    if (newVolume >= 0 && newVolume <= 1) {
        this.volume = newVolume;
        
        localStorage.setItem('volume', newVolume);
    }
}

SoundManager.prototype.getVolume = function() {
    return volume;
}

var Sound = function (name, src, vol) {
    this.name = name;
    this.src = src;
    if (vol == null) {
        this.vol = 1;
    } else {
        this.vol = vol;
    }
}

var soundManager = new SoundManager();

soundManager.add('shipExplode', 'assets/shipExplode.wav');
soundManager.add('enemyShoot', 'assets/enemyShoot.wav');
soundManager.add('enemyExplode', 'assets/enemyExplode.wav');
soundManager.add('buttonClick', 'assets/buttonClick.wav');
soundManager.add('shipHit', 'assets/shipHit.wav');