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
        return z;
    }
    //Primary event listeners.
    submit.addEventListener(`click`, function(){
        const videoID = sortingURLs(input.value);
        live.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
}
main();