function main() {
    //Main program variables.
    const live = document.querySelectorAll(`.live`)[0];
    const input = document.querySelectorAll(`.main-input`)[0];
    const submit = document.querySelectorAll(`.submit-button`)[0];
    const clear = document.querySelectorAll(`.clear-button`)[0];
    const save = document.querySelectorAll(`.save-button`)[0];
    const load = document.querySelectorAll(`.load-button`)[0];
    const prev = document.querySelectorAll(`.prev-button`)[0];
    const next = document.querySelectorAll(`.next-button`)[0];
    const displayList = document.querySelectorAll(`.display-playlist`)[0];
    let currentState = [];
    let currentID = 0;
    //Support functions.
    function createLocalStorageObject() {
        if (localStorage.getItem("master") === null) {
            const masterTemplate = [];
            localStorage.setItem("master", JSON.stringify(masterTemplate));
          }
    }
    function sortingURLs(z) {
        const totalURLs = z.split(`,`)
        let finalIDs = [];
        for (let i = 0; i < totalURLs.length; i++) {
            if (totalURLs[i].includes(`https://www.youtube.com/watch?v=`)) {
                finalIDs.push(totalURLs[i].slice(32,43));
                if (i === 0) {
                    currentState.push({
                        id: totalURLs[i].slice(32,43),
                        isActive: `1`
                    });
                } else {
                    currentState.push({
                        id: totalURLs[i].slice(32,43),
                        isActive: `0`
                    });
                }
            } else if (totalURLs[i].includes(`https://youtu.be/`)) {
                finalIDs.push(totalURLs[i].slice(17,28));
                if (i === 0) {
                    currentState.push({
                        id: totalURLs[i].slice(32,43),
                        isActive: `1`
                    });
                } else {
                    currentState.push({
                        id: totalURLs[i].slice(32,43),
                        isActive: `0`
                    });
                }
            }
        }
        return finalIDs;
    }
    function savingCurrentPlaylist() {
        let innerTemp = [];
        for (let i = 0; i < currentState.length; i++) {
            innerTemp.push(currentState[i].id);
        }
        localStorage.setItem("master", JSON.stringify(innerTemp));
    }
    function addToPlaylist(z) {
        const playlistItem = document.createElement(`div`);
        playlistItem.classList.add(`playlistItem`);
        playlistItem.style.backgroundImage = `url(http://img.youtube.com/vi/${z}/0.jpg)`;
        playlistItem.id = `${currentID++}`;
        playlistItem.addEventListener(`click`, function(){
            displayURL(z);
            const items = document.querySelectorAll(`.playlistItem`);
            for (let i = 0; i < items.length; i++) {
                items[i].style.border = `1px solid black`;
            }
            for (let i = 0; i < currentState.length; i++) {
                if (Number(this.id) === i) {
                    currentState[i].isActive = `1`;
                } else {
                    currentState[i].isActive = `0`;
                }
            }
            this.style.border = `1px solid aqua`;
        });
        displayList.appendChild(playlistItem);
        //Creating delete buttons for each playlist item.
        const deleteItem = document.createElement(`p`);
        deleteItem.innerText = `X`;
        deleteItem.classList.add(`deleteItem`);
        playlistItem.appendChild(deleteItem);
        deleteItem.addEventListener(`click`, function(){
            // const tempParentNode = playlistItem.parentNode;
            // tempParentNode.removeChild(playlistItem);
            console.log(playlistItem.id);
            const tempState = currentState.reduce(function(acc,item,index){
                if (Number(playlistItem.id) !== index) {
                    acc.push(item);
                }
                return acc;
            },[]);
            sortingURLs(tempState.reduce(function(accZ,itemZ){
                accZ.push(`https://www.youtube.com/watch?v=${itemZ.id}`);
                return accZ;
            },[]).join(`,`));
            cleanUp();
            //How to remove and replace all items within the playlist display?
            //The problems I'm facing with this code center around the currentState variable.
            for (let i = 0; i < tempState.length; i++) {
                addToPlaylist(tempState[i].id);
            }
            //displayURL(tempState[0].id);
            //document.querySelectorAll(`.playlistItem`)[0].style.border = `1px solid aqua`;
        });
    }
    function displayURL(z) {
        live.innerHTML = `<iframe width="560" height="313" src="https://www.youtube.com/embed/${z}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    function cleanUp() {
        displayList.innerHTML = ``;
        live.innerHTML = ``;
        currentID = 0;
        currentState = [];
    }
    //Primary event listeners.
    submit.addEventListener(`click`, function(){
        const videoID = sortingURLs(input.value);
        if (videoID.length > 0) {
            createLocalStorageObject();
            for (let i = 0; i < videoID.length; i++) {
                addToPlaylist(videoID[i]);
            }
            displayURL(videoID[0]);
            document.querySelectorAll(`.playlistItem`)[0].style.border = `1px solid aqua`;
        }
    });
    clear.addEventListener(`click`, function(){
        cleanUp();
    });
    save.addEventListener(`click`, function(){
        createLocalStorageObject();
        savingCurrentPlaylist();
    });
    load.addEventListener(`click`, function(){
        cleanUp();
        createLocalStorageObject();
        const retrievedMaster = localStorage.getItem(`master`);
        const retrievedMasterParsed = JSON.parse(retrievedMaster);
        if (retrievedMasterParsed.length > 0) {
            for (let i = 0; i < retrievedMasterParsed.length; i++) {
                if (i === 0) {
                    currentState.push({
                        id: retrievedMasterParsed[i],
                        isActive: `1`
                    });
                } else {
                    currentState.push({
                        id: retrievedMasterParsed[i],
                        isActive: `0`
                    });
                }
                addToPlaylist(retrievedMasterParsed[i]);
            }
            displayURL(retrievedMasterParsed[0]);
            document.querySelectorAll(`.playlistItem`)[0].style.border = `1px solid aqua`;
        }
    });
    prev.addEventListener(`click`, function(){
        for (let i = 1; i < currentState.length; i++) {
            const items = document.querySelectorAll(`.playlistItem`);
            if (currentState[i].isActive === `1`) {
                displayURL(currentState[i - 1].id);
                for (let q = 0; q < currentState.length; q++) {
                    if (q === (i - 1)) {
                        currentState[q].isActive = `1`
                        items[q].style.border = `1px solid aqua`;
                    } else {
                        currentState[q].isActive = `0`;
                        items[q].style.border = `1px solid black`;
                    }
                }
            }
        }
    });
    next.addEventListener(`click`, function(){
        let switched = 0;
        for (let i = 0; i < (currentState.length - 1); i++) {
            const items = document.querySelectorAll(`.playlistItem`);
            if (currentState[i].isActive === `1` && switched < 1) {
                ++switched;
                displayURL(currentState[i + 1].id);
                currentState[i].isActive = `0`;
                currentState[i + 1].isActive = `1`;
                items[i].style.border = `1px solid black`;
                items[i + 1].style.border = `1px solid aqua`;
            }
        }
        switched = 0;
    });
}
main();
