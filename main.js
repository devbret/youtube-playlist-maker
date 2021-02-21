function main() {
    const live = document.querySelectorAll(`.live`)[0];
    const input = document.querySelectorAll(`.main-input`)[0];
    const submit = document.querySelectorAll(`.submit-button`)[0];
    const clear = document.querySelectorAll(`.clear-button`)[0];
    const save = document.querySelectorAll(`.save-button`)[0];
    const load = document.querySelectorAll(`.load-button`)[0];
    const prev = document.querySelectorAll(`.prev-button`)[0];
    const next = document.querySelectorAll(`.next-button`)[0];
    const displayList = document.querySelectorAll(`.display-playlist`)[0];
    //Support functions.
    function sortingURLs(z) {
        const totalURLs = z.split(`,`)
        //Add logic for filtering through URLs here.
        return totalURLs;
    }
    function addToPlaylist(z) {
        const playlistItem = document.createElement(`div`);
        playlistItem.classList.add(`playlistItem`);
        playlistItem.style.backgroundImage = `url(http://img.youtube.com/vi/${z}/0.jpg)`;
        displayList.appendChild(playlistItem);
    }
    function displayURL(z) {
        live.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${z}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    //Primary event listeners.
    submit.addEventListener(`click`, function(){
        const videoID = sortingURLs(input.value);
        for (let i = 0; i < videoID.length; i++) {
            addToPlaylist(videoID[i]);
        }
        displayURL(videoID);
    });
}
main();
