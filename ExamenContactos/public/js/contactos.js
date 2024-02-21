const URL_BASE = "http://localhost:3000/api";
const IMG = document.querySelector("img");
const TITULO = document.querySelector("h1");
const EMAIL = document.querySelector(".email");

function laodContactos() 
{
TBODY.innerHTML = `
<tr>
  <td colspan="3">Cargando...</td>
</tr>
`;
fetch(URL_BASE + "/contacts")
.then(res => res.json())
.then(json => {
  console.log(json);
  let contactos = json;
  console.log(contactos);
  TBODY.innerHTML = "";
  contactos.forEach(contacto => {
    let card = document.createElement("div");
    card.innerHTML += `
    <div class="card">
      <h1>${contacto.name}</h1>
      <img id="image" src="${contacto.image}">
      <p class="email">${contacto.email}</p>
    </div>
    `;
  });
})
}

laodContactos();