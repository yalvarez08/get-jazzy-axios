function onReady() {
    console.log('Hello from client.js');

    getArtistsRenderToDom();


    // TODO Add Axios request for /songs and display on DOM

    axios({
        method: 'GET',
        url: '/song'
    })
        .then(function (response) {
            // Code that will run on successful response
            // from the server.
            console.log(response);
            // quotesFromServer will be an Array of quotes
            let quotesFromServer = response.data;
            let contentDiv = document.querySelector('#songTableBody');
            for (let song of quotesFromServer) {
                contentDiv.innerHTML += `
            <tr>
                <td>${song.title}</td>
                <td>${song.artist}</td>
            </tr>
        `;
            }
        }).catch(function (error) {
            // Code that will run on any errors from the server.
            console.log(error);
            alert('Something bad happened! Check the console for more details.')
        });
}
function getArtistsRenderToDom() {
    //this will allow to reset everytime
    document.querySelector('#artistTableBody').innerHTML = '';

axios({
    method: 'GET',
    url: '/artist'
})
    .then(function (response) {
        // Code that will run on successful response
        // from the server.
        console.log(response);
        // quotesFromServer will be an Array of quotes
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#artistTableBody');
        for (let artist of quotesFromServer) {
            contentDiv.innerHTML += `
            <tr>
                <td>${artist.name}</td>
                <td>${artist.born}</td>
                <td>${artist.died}</td>
            </tr>
        `;
        }
    }).catch(function (error) {
        // Code that will run on any errors from the server.
        console.log(error);
        alert('Something bad happened! Check the console for more details.')
    });
}

function artistMesssageForServer(event) {
    event.preventDefault();
    console.log('success. form was submitted');

    //get input info from DOM IOT send to server.js
    let name = document.getElementById('name').value;
    let born = document.getElementById('born').value;
    let died = document.getElementById('died').value;

    //consolidate info^^ 
    //server accepts info that is 1 object
    let addArtist = {
        name: name,
        born: born,
        died: died
    };

axios({
    method: 'POST',
    url: '/artist',
    data: addArtist
})
.then (function(response) {
    //this will handle good/successful response
    console.log('Request to POST /artist worked.', response.status);
    getArtistsRenderToDom();

    document.getElementById('name').value = '';
    document.getElementById('born').value = '';
    document.getElementById('died').value = '';

})
.catch (function(error) {
    //this will handle bad response
    alert('Request to POST /artist failed. Please try again.');
    console.error('Request to POST /artist failed.', error);
    }
);

}
onReady();
