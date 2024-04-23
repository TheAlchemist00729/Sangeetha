//Axios key code to request Shazam API through RapidAPI
const axios = require('axios');
const querystring = require('querystring');

const API_KEY = 'd0dc335517msh42d6d4218fb22e8p1ebf86jsn7e0906f4c8d1';
const API_HOST = 'shazam.p.rapidapi.com';

//Call Shazam API with Axios
async function searchShazam(searchTerm) {
  try {
    const apiUrl = `https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(artistName)}&locale=en-US`;
    const headers = {
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
      'X-RapidAPI-Key': 'd0dc335517msh42d6d4218fb22e8p1ebf86jsn7e0906f4c8d1', // 
    };
    
    const response = await axios.get(apiUrl, { headers });
    const data = response.data;
    
    
    
    // Process songs and album covers
    const songs = data.tracks.hits.map(hit => {
      const track = hit.track;
      return {
        title: track.title,
        subtitle: track.subtitle,
        imageUrl: track.share.image,
      };
    });
    
    return songs;
  } catch (error) {
    console.error('Error searching for songs:', error);
    throw error;
  }
}
//Format and log songs
async function formatAndLogSongs(searchTerm) {
  try {
    const songs = await searchShazam(searchTerm);
    
    if (songs.length === 0) {
      console.log('No songs found.');
      return;
    }

    // Create ordered list in HTML format
    const listItems = songs.map((song, index) => `<li>${index + 1}. ${song.title} - ${song.subtitle}</li>`);
    const orderedList = `<ol>${listItems.join('')}</ol>`;
    
    // Log the ordered list
    console.log('Songs:');
    console.log(orderedList);
  } catch (error) {
    console.error('Error:', error);
  }
}

//Format and log songs continued
formatAndLogSongs('Alice Cooper');

//Search songs by artist
searchSongsByArtist('Alice Cooper')
  .then(songs => {
    console.log('Songs by Alice Cooper:', songs);
  })
  .catch(error => {
    console.error('Error:', error);
  });