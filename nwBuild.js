var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
  files: [
    './index.js',
    './index.html',
    './package.json',
    './icon_tray@2x.png',
    './icon_tray_windows.png',
    './icon.png',
  ],
  flavor: 'normal',
  platforms: ['osx64', 'win32', 'win64', 'linux32', 'linux64'],
  version: '0.20.3',
  buildDir: './out',
  macIcns: './icon.icns',
  winIco: './icon.ico',
});

nw.on('log', console.log);

nw.build()
  .then(function() {
    console.log('all done!');
  })
  .catch(function(error) {
    console.error(error);
  });
