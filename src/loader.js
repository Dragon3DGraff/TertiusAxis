import "./loader.css";

const loader = {
  show() {
    document.body.appendChild(createLoader());
  },
  hide() {
    let loader = document.getElementById("loader");
    if (loader) document.body.removeChild(loader);
  },
};

function createLoader() {
  let loader = document.createElement("div");
  loader.className = "loader";
  loader.id = "loader";

  let text = document.createElement("h1");
  text.className = "loader-text";
  text.innerHTML = "Loading...";
  loader.appendChild(text);

  let container = document.createElement("div");
  container.className = "container";
  container.id = "container";

  let uno = document.createElement("div");
  uno.className = "dash uno";
  uno.id = "uno";
  container.appendChild(uno);

  let dos = document.createElement("div");
  dos.className = "dash dos";
  dos.id = "dos";
  container.appendChild(dos);

  let tres = document.createElement("div");
  tres.className = "dash tres";
  tres.id = "tres";
  container.appendChild(tres);

  let cuatro = document.createElement("div");
  cuatro.className = "dash cuatro";
  cuatro.id = "cuatro";
  container.appendChild(cuatro);

  loader.appendChild(container);

  return loader;
}

export { loader };
