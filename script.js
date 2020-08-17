// search button function
const searchResults = [];

function getResult() {
    const allResults = document.getElementById("results-div");
    allResults.innerHTML = "";
    allResults.style.display = "block";
    document.getElementById("lyrics-div").innerHTML = "";
    const searchInput = document.getElementById("search-input");
    fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            for (i = 0; i < 10; i++) {
                const title = data.data[i].title;
                const artistName = data.data[i].artist.name;
                const id = data.data[i].id;
                allResults.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                                        <div class="col-md-9">
                                                                        <h3 class="lyrics-name">${title}</h3>
                                                                        <p class="author lead">Album by <span>${artistName}</span></p>
                                                                        </div>
                                                                        <div class="col-md-3 text-md-right text-center">
                                                                        <button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button>
                                                                        </div>
                                                                    </div>`
                searchResults.push({
                    "id": data.data[i].id,
                    "title": data.data[i].title,
                    "artist": data.data[i].artist.name
                })
            }
        })
}

function getLyrics(id) {
    for (let i = 0; i < 10; i++) {
        if (searchResults[i].id == id) {
            const artistName = searchResults[i].artist;
            const songTitle = searchResults[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
                .then(res => res.json())
                .then(data => {
                    if (data.lyrics == undefined) {
                        data.lyrics = `Lyrics Not Found`;
                    }

                    document.getElementById('lyrics-div').innerHTML += ` <button onclick="goBack()" class="btn btn-outline-success go-back">&lsaquo;</button>
                    <h2 class="text-success mb-4">${songTitle} - ${artistName}</h2>
                <pre class="lyric text-white">${data.lyrics}</pre>`
                })
        }
    }
    document.getElementById("results-div").style.display = "none";

}

function goBack() {
    document.getElementById("results-div").style.display = "block";
    document.getElementById("lyrics-div").style.display = "none";
}