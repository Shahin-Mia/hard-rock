// search button function

function getResult() {
    const allResults = document.getElementById("results-div");
    allResults.innerHTML = "";
    allResults.style.display = "block";
    document.getElementById("lyrics-div").innerHTML = "";
    const searchInput = document.getElementById("search-input");
    if (searchInput.value === "") {
        allResults.innerHTML = `<h3>You didn't insert any Song Name or Artist name in Search box</h3>`;
    }
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
                                                <button onClick="getLyrics('${title}', '${artistName}')" class="btn btn-success">Get Lyrics</button>
                                            </div>
                                        </div>`
            }
        })
}

function getLyrics(title, artist) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            if (data.lyrics == undefined) {
                data.lyrics = `Lyrics Not Found`;
            }

            document.getElementById('lyrics-div').innerHTML += ` <button onclick="goBack()" class="btn btn-outline-success go-back">&lsaquo;</button>
                    <h2 class="text-success mb-4">${title} - ${artist}</h2>
                <pre class="lyric text-white">${data.lyrics}</pre>`
        })

    document.getElementById("results-div").style.display = "none";
    document.getElementById("lyrics-div").style.display = "block";

}


//function for back button
function goBack() {
    document.getElementById("lyrics-div").style.display = "none";
    getResult();
}