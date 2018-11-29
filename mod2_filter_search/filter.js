const lista = document.getElementById('lista');
// console.log(lista)

// fetch('https://api.punkapi.com/v2/beers?per_page=80')
fetch('masini.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (masini) {
        console.log(masini)
        //parcurgem array-ul
        //sa luam fiecare obiect individula si sa ii postam vaoarea cheii in DOM
        for (let i = 0; i < masini.length; i++) {
            // lista.innerHTML = '<li class="list-group-item">NumeMasina <strong> Capacitate</strong></li>'
            // console.log(masini[i].nume +' are capacitatea de: '+masini[i].capacitate );
            lista.innerHTML += `
            <li class="list-group-item">
                <!-- <strong>` + masini[i].name +`</strong> : <p>`+ masini[i].tagline +`</p> -->
                <strong>` + masini[i].nume +`</strong> : <p>`+ masini[i].capacitate +`</p>
            </li>  
            `
        }
    })
    const searchBar = document.getElementById('searchBar')
    searchBar.addEventListener('keyup', function(event){
        // console.log(event.target.value)
        let term = event.target.value.toLowerCase();
        let items = document.getElementsByTagName('li')
        console.log(items +' cu caracterul cautat: '+ term)
        Array.from(items).forEach(function(item) {
            // console.log('din foreach ' + item);
            let nameOfItem = item.innerHTML;
            // console.log(nameOfItem +'adica nume')
        if(nameOfItem.toLowerCase().indexOf(term) != -1){
            item.style.display='block';
        } else{
            item.style.display='none';
        }
        })
        
    })