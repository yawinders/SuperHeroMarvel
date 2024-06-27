
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('.loaderp');
    const url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=b9234a4a93f0b4311a686044cc474b26&hash=b9d6c67c71246839d086909b02208b69';
    const marvelContainer = document.querySelector('.marvel-container');

    const searchInput = document.querySelector('#inp-hero');

    const superHeroList = document.querySelector('.superHeroList')

    let namesArray = [];

    let favArray = [];

    // if (localStorage.getItem('favorites')) {
    //     favoritesArray = JSON.parse(localStorage.getItem('favorites'));
    //     displayFavList();
    // }
    fetch(url).then((obj) => obj.json()).then((objdata) => {
        // console.log(objdata);
        loader.textContent = "Successfully Loaded..";
        // showData(objdata);
        // console.log(objdata.data.results);
        // console.log(inputHero.value.length);
        namesArray = objdata.data.results;
        console.log(namesArray);
        showData(namesArray); // initally display all the marvel chaacters

    })

    //adding event listener for search input
    searchInput.addEventListener('keyup', () => {
        const query = searchInput.value.toLowerCase();
        // console.log(query);
        const filteredCharacters = namesArray.filter(nameobj => nameobj.name.toLowerCase().includes(query));
        console.log(filteredCharacters);
        showData(filteredCharacters);

    })
    //function to show marvel characters all
    function showData(nameArr) {
        marvelContainer.innerHTML = "";
        nameArr.forEach(element => {

            const anchor = document.createElement('a');
            anchor.href = element.urls[0].url;
            anchor.target = `_blank`;
            const image = document.createElement('img');
            image.style.width = '220px';
            image.style.height = '300px';
            image.src = `${element.thumbnail.path}.${element.thumbnail.extension}`;
            const h3 = document.createElement('h3');
            h3.textContent = element.name;

            //adding favourite button
            const favourite = document.createElement('button');
            favourite.textContent = 'Favourite';
            let temp = true;
            favourite.addEventListener('click', () => {
                if (temp) {
                    temp = false;
                    favourite.textContent = 'remove';
                }
                else {
                    temp = true;
                    favourite.textContent = 'favourite';
                }

                favourite.style.backgroundColor = 'orange';


                HandleFavourite(element);
            })
            // console.log(element.name);
            // console.log(element.thumbnail.path + element.thumbnail.extension);
            //creating a div 
            const favDiv = document.createElement('div');
            favDiv.appendChild(favourite);

            anchor.appendChild(image);
            anchor.appendChild(h3);
            // anchor.insertBefore(favourite, anchor);

            // anchor.style.display = 'block';
            marvelContainer.appendChild(anchor);
            marvelContainer.appendChild(favDiv);
            // marvelContainer.append(favourite);


            // marvelContainer.appendChild(h3);

            // let string = `<div style="height:100px; width:100px"><a href=${element.urls[0].url}><img src=${element.thumbnail.path + element.thumbnail.extension}></a></div>`;

            // marvelContainer.appendChild(string);

        });
    }

    function HandleFavourite(element) {
        console.log('adding it tpa favourite list');
        const index = favArray.findIndex(fav => fav.name === element.name)
        if (index === -1) {
            favArray.push(element);
        }
        else {
            favArray.splice(index, 1);
            // favourite.style.backgroundColor = 'red';
            // favourite.textContent = 'favourite';
        }
        localStorage.setItem('favorites', JSON.stringify(favArray));
        displayFavList(element);
    }

    if (localStorage.getItem('favorites')) {    //getting data from localstorage and add it to the my display favaarrray list
        favArray = JSON.parse(localStorage.getItem('favorites'));
        displayFavList();
    }
    function displayFavList() {
        superHeroList.innerHTML = "";
        favArray.forEach((obj) => {
            const list = document.createElement('li');
            list.textContent = obj.name;
            superHeroList.appendChild(list);
        })


    }

})














// renderMarvel();

