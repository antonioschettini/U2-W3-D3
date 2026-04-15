// Assegno ad una variabile per l'url della fetch in modo di non sporcare il codice
const libreriaUrl = "https://striveschool-api.herokuapp.com/books";

// Inizio la funzione per la fetch
const getLibreria = function () {
  fetch(libreriaUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore dal server");
      }
    })
    .then((libri) => {
      // Recupero la row dall'id dato in html
      const riga = document.getElementById("book-row");

      // Inizio il ciclo forEach per ciclare, creare le card ed inserire i valori ai campi delle card
      libri.forEach((libro) => {
        const colonna = document.createElement("div");

        //Aggiungiamo le classi per aggiungere classi bootstrap
        colonna.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
        //Vado a modificare l'inner html della colonna per defirirne la struttura come card di bootstrap
        colonna.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${libro.img}" class="card-img-top h-75" alt="${libro.title}">
            <div class="card-body d-flex flex-column justify-content-around h-25">
              <h6 class="card-title text-truncate">${libro.title}</h6>
              <p class="card-text"><strong>${libro.price}€</strong></p>
              <div>
                <button class="btn btn-success w-100 mb-2" onclick='aggiungiAlCarrello("${libro.title}", "${libro.price}")'>Aggiungi</button>
                <button class="btn btn-outline-secondary w-100" onclick="this.closest('.col-12').remove()">Nascondi</button>
              </div>
            </div>
          </div>
        `;
        // Appendo la col alla row padre nell'html
        riga.appendChild(colonna);
      });
    })
    .catch((error) => {
      console.log("Errore nella fetch", error);
    });
};

// Lancio la funzione all'avvio della pagina
getLibreria();

// Carichiamo i dati salvati nel browser
let carrello = JSON.parse(localStorage.getItem("carrello-epicode")) || [];

// Funzione per mostrare il carrello all'avvio
const visualizzaCarrello = function () {
  const lista = document.getElementById("lista-carrello");
  lista.innerHTML = ""; // Svuoto la lista

  carrello.forEach((item, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.titolo} - ${item.prezzo}
      <button class="btn btn-danger btn-sm" onclick="rimuoviDalCarrello(${index})">Rimuovi</button>
    `;
    lista.appendChild(li);
  });
};

// Creo la funzione per aggiungere un libro
const aggiungiAlCarrello = function (titolo, prezzo) {
  carrello.push({ titolo: titolo, prezzo: prezzo });

  // Salviamo nel browser in localStorage
  localStorage.setItem("carrello-epicode", JSON.stringify(carrello));
  visualizzaCarrello();

  // Mostro il modale con nome del libro
  document.getElementById("modal-message").innerText =
    `Hai aggiunto "${titolo}" al carrello!`;
  const modalElement = new bootstrap.Modal(
    document.getElementById("successModal"),
  );
  modalElement.show();
};

//Funzione per rimuovere un libro dal carrello
const rimuoviDalCarrello = function (index) {
  carrello.splice(index, 1); // rimuove il primo elemento
  localStorage.setItem("carrello-epicode", JSON.stringify(carrello));
  visualizzaCarrello();
};

// Lancio la funzione per caricare il carrello in localstorage
visualizzaCarrello();
