const URL_BASE = "http://localhost:3000/api";
const TBODY = document.querySelector("tbody");
const ID = document.getElementById('id');
const NOMBRE = document.getElementById('name');
const INDUSTRIA = document.getElementById('industry');
const SECTOR = document.getElementById('sector');
const CAPITAL = document.getElementById('capital');

function loadEmpresas() {
  TBODY.innerHTML = `
    <tr>
      <td colspan="5">Cargando...</td>
    </tr>
  `;

  fetch(URL_BASE + "/companies")
    .then(res => res.json())
    .then(json => {
      let empresas = json;
      const empresasMarcadas = JSON.parse(localStorage.getItem('empresasMarcadas')) || [];

      TBODY.innerHTML = '';

      TBODY.addEventListener('click', function(e) {
        if (e.target.tagName === 'TD') {
          const fila = e.target.parentElement;
          fila.classList.toggle('marcada');

          const idEmpresa = fila.querySelector('td:first-child').innerText;
          const index = empresasMarcadas.indexOf(idEmpresa);

          if (index === -1) {
            empresasMarcadas.push(idEmpresa);
          } else {
            empresasMarcadas.splice(index, 1);
          }

          localStorage.setItem('empresasMarcadas', JSON.stringify(empresasMarcadas));
        }
      });

      empresas.forEach(empresa => {
        let linea = document.createElement('tr');
        linea.classList.toggle('marcada', empresasMarcadas.includes(empresa.id));
        linea.innerHTML = `
          <td>${empresa.id}</td>
          <td>${empresa.name}</td>
          <td>${empresa.industry}</td>
          <td>${empresa.sector}</td>
          <td>${empresa.capital}</td>
        `;
        TBODY.appendChild(linea);
      });
    });
}

function crearEmpresa() {
  let empresa = {
    "name": NOMBRE.value,
    "industry": INDUSTRIA.value,
    "sector": SECTOR.value,
    "capital": CAPITAL.value,
  };

  fetch(URL_BASE + "/companies", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empresa)
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  loadEmpresas();
}


function loadEmpresa(id){
  fetch(URL_BASE + "/empresas/" + id)
  .then(res => res.json())
  .then(json => {
    let empresa = json.company;
    console.log(empresa);
    ID.value = empresa.id;
    NOMBRE.value = empresa.name;
    INDUSTRIA.value = empresa.industry;
    SECTOR.value = empresa.sector;
    CAPITAL.value = empresa.capital;
  })
}





loadEmpresas();
