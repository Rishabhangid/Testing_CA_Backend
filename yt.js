// const fs = require('fs');
// const ytdl = require('ytdl-core');
// // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// // TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('https://youtu.be/pBYuHMJyg_g?si=J2awp7XmPXT492-k')
//   .pipe(fs.createWriteStream('video.mp4'));
const fs = require('fs');
const ytdl = require('ytdl-core');

// URL of the YouTube video to download
const videoURL = 'https://youtu.be/pBYuHMJyg_g';

// Destination file name
const outputFileName = 'video.mp4';

// Download the video and save it to the file
ytdl(videoURL)
  .pipe(fs.createWriteStream(outputFileName))
  .on('finish', () => {
    console.log('Download complete. Video saved as:', outputFileName);
  })
  .on('error', (error) => {
    console.error('Error downloading the video:', error);
  });
