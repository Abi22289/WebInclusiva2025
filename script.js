function leerContenido() {
  const texto = document.body.innerText;
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-ES";
  window.speechSynthesis.speak(voz);
}

function activarContraste() {
  document.body.classList.toggle("alto-contraste");
}

let tamañoActual = 18;

function aumentarTexto() {
  tamañoActual += 2;
  document.body.style.fontSize = tamañoActual + "px";
}

function disminuirTexto() {
  tamañoActual = Math.max(12, tamañoActual - 2);
  document.body.style.fontSize = tamañoActual + "px";
}

function mostrarContenido(id) {
  const secciones = ['audio', 'cursos', 'herramientas'];
  secciones.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.className = (sec === id) ? "recurso-visible" : "recurso-oculto";
  });
}
function mostrarContenido(id) {
  const secciones = ['audio', 'cursos', 'herramientas'];
  secciones.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.className = (sec === id) ? "recurso-visible" : "recurso-oculto";
  });
}

function reproducirAudio(input) {
  mostrarContenido('audio');
  const archivo = input.files[0];
  if (archivo) {
    const url = URL.createObjectURL(archivo);
    const reproductor = document.getElementById("reproductor");
    reproductor.src = url;
    reproductor.classList.remove("recurso-oculto");
    reproductor.play();
  }
}

function mostrarContenido(id) {
  const secciones = ['audio', 'cursos', 'herramientas', 'video', 'pdf'];
  secciones.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.className = (sec === id) ? "recurso-visible" : "recurso-oculto";
  });
}


function reproducirAudio(input) {
  mostrarContenido('audio');
  const archivo = input.files[0];
  if (archivo) {
    const url = URL.createObjectURL(archivo);
    const reproductor = document.getElementById("reproductor");
    reproductor.src = url;
    reproductor.classList.remove("recurso-oculto");
    reproductor.play();

    const nombre = document.getElementById("nombreArchivoAudio");
    nombre.textContent = `Reproduciendo: ${archivo.name}`;
  }
}

function detenerAudio() {
  const reproductor = document.getElementById("reproductor");
  reproductor.pause();
  reproductor.currentTime = 0;
}

function reproducirVideo(input) {
  mostrarContenido('video');
  const archivo = input.files[0];
  if (archivo) {
    const url = URL.createObjectURL(archivo);
    const reproductor = document.getElementById("reproductorVideo");
    reproductor.src = url;
    reproductor.classList.remove("recurso-oculto");
    reproductor.play();

    const nombre = document.getElementById("nombreArchivoVideo");
    nombre.textContent = `Reproduciendo: ${archivo.name}`;
  }
}

function detenerVideo() {
  const reproductor = document.getElementById("reproductorVideo");
  reproductor.pause();
  reproductor.currentTime = 0;
}

function mostrarPDF(input) {
  mostrarContenido('pdf');
  const archivo = input.files[0];
  if (archivo) {
    const url = URL.createObjectURL(archivo);
    const visor = document.getElementById("visorPDF");
    visor.src = url;
    visor.classList.remove("recurso-oculto");

    const nombre = document.getElementById("nombreArchivoPDF");
    nombre.textContent = `Mostrando: ${archivo.name}`;
  }
}

function mostrarCurso(input) {
  mostrarContenido('cursos');
  const archivo = input.files[0];
  if (archivo) {
    const nombre = document.getElementById("nombreArchivoCurso");
    nombre.textContent = `Archivo cargado: ${archivo.name}`;

    const visor = document.getElementById("visorCursoPDF");
    if (archivo.type === "application/pdf") {
      const url = URL.createObjectURL(archivo);
      visor.src = url;
      visor.classList.remove("recurso-oculto");
    } else {
      visor.src = "";
      visor.classList.add("recurso-oculto");
    }
  }
}

function mostrarHerramienta(input) {
  mostrarContenido('herramientas');
  const archivo = input.files[0];

  if (archivo) {
    const nombre = document.getElementById("nombreArchivoHerramienta");
    nombre.textContent = `Archivo cargado: ${archivo.name}`;

    const url = URL.createObjectURL(archivo);
    const visor = document.getElementById("visorHerramienta");
    const enlace = document.getElementById("descargarHerramienta");

    if (archivo.type === "application/pdf") {
      visor.src = url;
      visor.classList.remove("recurso-oculto");
      enlace.classList.add("recurso-oculto");
    } else {
      visor.classList.add("recurso-oculto");
      visor.src = "";
      enlace.href = url;
      enlace.download = archivo.name;
      enlace.classList.remove("recurso-oculto");
    }
  }
}

function mostrarHerramienta(input) {
  mostrarContenido('herramientas');
  const archivo = input.files[0];

  if (archivo) {
    const nombre = document.getElementById("nombreArchivoHerramienta");
    const visor = document.getElementById("visorHerramienta");
    const enlace = document.getElementById("descargarHerramienta");
    const advertencia = document.getElementById("advertencia");

    nombre.textContent = `Archivo cargado: ${archivo.name}`;
    const url = URL.createObjectURL(archivo);

    const extensionPeligrosa = ['exe', 'bat', 'msi'];
    const ext = archivo.name.split('.').pop().toLowerCase();

    // Reset
    visor.classList.add("recurso-oculto");
    enlace.classList.add("recurso-oculto");
    advertencia.classList.add("recurso-oculto");
    visor.src = "";
    advertencia.textContent = "";

    if (archivo.type === "application/pdf") {
      visor.src = url;
      visor.classList.remove("recurso-oculto");
    } else if (extensionPeligrosa.includes(ext)) {
      advertencia.textContent = "⚠️ Advertencia: Este archivo puede ser ejecutable. Verifica que sea seguro antes de descargarlo.";
      advertencia.classList.remove("recurso-oculto");
      enlace.href = url;
      enlace.download = archivo.name;
      enlace.classList.remove("recurso-oculto");
    } else {
      // Archivos no peligrosos (como .zip, .docx)
      enlace.href = url;
      enlace.download = archivo.name;
      enlace.classList.remove("recurso-oculto");
    }
  }
}

function verificarHerramienta(input) {
  const archivo = input.files[0];
  if (!archivo) return;

  const ext = archivo.name.split('.').pop().toLowerCase();
  const bloqueados = ['exe', 'bat', 'msi'];

  if (bloqueados.includes(ext)) {
    input.value = "";  // Limpia el input
    mostrarModalAdvertencia();
    return;
  }

  mostrarContenido('herramientas');
  const nombre = document.getElementById("nombreArchivoHerramienta");
  const visor = document.getElementById("visorHerramienta");
  const enlace = document.getElementById("descargarHerramienta");

  nombre.textContent = `Archivo cargado: ${archivo.name}`;
  const url = URL.createObjectURL(archivo);

  visor.classList.add("recurso-oculto");
  enlace.classList.add("recurso-oculto");
  visor.src = "";

  if (archivo.type === "application/pdf") {
    visor.src = url;
    visor.classList.remove("recurso-oculto");
  } else {
    enlace.href = url;
    enlace.download = archivo.name;
    enlace.classList.remove("recurso-oculto");
  }
}

function mostrarModalAdvertencia() {
  const modal = document.getElementById("modalAdvertencia");
  modal.classList.remove("recurso-oculto");
}

function cerrarModal() {
  const modal = document.getElementById("modalAdvertencia");
  modal.classList.add("recurso-oculto");
}

function agregarAlHistorial(idLista, archivo) {
  const lista = document.getElementById(idLista);
  const ext = archivo.name.split('.').pop().toLowerCase();
  const icono = obtenerIconoPorExtension(ext);
  const ahora = new Date();
  const fecha = ahora.toLocaleString('es-PE');

  const entrada = `${icono} ${archivo.name} – ${fecha}`;
  
  // Mostrar en pantalla
  const li = document.createElement('li');
  li.textContent = entrada;
  lista.appendChild(li);

  // Guardar en localStorage
  const clave = `historial-${idLista}`;
  const historialGuardado = JSON.parse(localStorage.getItem(clave)) || [];
  historialGuardado.push(entrada);
  localStorage.setItem(clave, JSON.stringify(historialGuardado));
}

function cargarHistorial(idLista) {
  const lista = document.getElementById(idLista);
  const clave = `historial-${idLista}`;
  const historialGuardado = JSON.parse(localStorage.getItem(clave)) || [];
  
  historialGuardado.forEach(entrada => {
    const li = document.createElement('li');
    li.textContent = entrada;
    lista.appendChild(li);
  });
}

function limpiarHistorial(idLista) {
  const lista = document.getElementById(idLista);
  lista.innerHTML = '';
  localStorage.removeItem(`historial-${idLista}`);
}

function obtenerIconoPorExtension(ext) {
  switch (ext) {
    case 'pdf': return '📄';
    case 'zip': case 'rar': return '📦';
    case 'docx': case 'doc': return '📝';
    case 'mp3': return '🎵';
    case 'mp4': return '🎥';
    case 'exe': case 'bat': case 'msi': return '⚠️';
    default: return '📁';
  }
}

window.onload = function () {
  document.getElementById('barraBusqueda').focus(); // ⬅️ enfoca al cargar

  // carga historiales
  cargarHistorial('historialAudio');
  cargarHistorial('historialCursos');
  cargarHistorial('historialHerramientas');
  cargarHistorial('historialVideo');
  cargarHistorial('historialPDF');
};



function exportarHistorial(idLista, nombreArchivo) {
  const clave = `historial-${idLista}`;
  const historialGuardado = JSON.parse(localStorage.getItem(clave)) || [];

  if (historialGuardado.length === 0) {
    alert("No hay historial para exportar.");
    return;
  }

  const contenido = historialGuardado.join('\n');
  const blob = new Blob([contenido], { type: 'text/plain' });
  const enlace = document.createElement('a');

  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombreArchivo + '.txt';
  enlace.click();
}

async function transcribirAudio() {
  const input = document.querySelector('input[type="file"][accept=".mp3"]');
  const archivo = input.files[0];

  if (!archivo) {
    alert("Primero sube un archivo de audio.");
    return;
  }

  const formData = new FormData();
  formData.append("audio", archivo);

  try {
    const respuesta = await fetch('https://webinclusiva2025-1.onrender.com/transcribe', {
      method: "POST",
      body: formData,
    });

    const texto = await respuesta.text();
    document.getElementById("textoTranscrito").textContent = texto;
    localStorage.setItem("transcripcionActual", texto);
  } catch (error) {
    console.error("Error al transcribir:", error);
    document.getElementById("textoTranscrito").textContent = "Ocurrió un error al transcribir el audio.";
  }
}


function exportarTodosLosHistoriales() {
  const secciones = [
    { id: 'historialAudio', nombre: '🎧 Audio' },
    { id: 'historialCursos', nombre: '📚 Cursos' },
    { id: 'historialHerramientas', nombre: '🧩 Herramientas' },
    { id: 'historialVideo', nombre: '🎥 Video' },
    { id: 'historialPDF', nombre: '📄 PDF' }
  ];

  let contenidoTotal = '';

  secciones.forEach(seccion => {
    const clave = `historial-${seccion.id}`;
    const datos = JSON.parse(localStorage.getItem(clave)) || [];
    contenidoTotal += `== ${seccion.nombre} ==\n`;
    if (datos.length > 0) {
      contenidoTotal += datos.join('\n') + '\n';
    } else {
      contenidoTotal += 'Sin archivos registrados.\n';
    }
    contenidoTotal += '\n';
  });

  const blob = new Blob([contenidoTotal], { type: 'text/plain' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = 'historial_completo.txt';
  enlace.click();
}

function buscarRecursos() {
  const entrada = document.getElementById('barraBusqueda').value.toLowerCase();
  const listas = document.querySelectorAll('section ul li');

  listas.forEach(item => {
    const textoOriginal = item.textContent;
    const texto = textoOriginal.toLowerCase();

    // Restaurar contenido antes de aplicar resaltado
    item.innerHTML = textoOriginal;

    if (entrada === '') {
      item.style.display = 'list-item';
    } else if (texto.includes(entrada)) {
      // Resalta el texto buscado
      const regex = new RegExp(`(${entrada})`, 'gi');
      const resaltado = textoOriginal.replace(regex, `<mark>$1</mark>`);
      item.innerHTML = resaltado;
      item.style.display = 'list-item';

      // Si el ítem está dentro de una sección oculta, la mostramos automáticamente
      let padre = item.closest('.recurso-oculto');
      if (padre) {
        padre.classList.remove('recurso-oculto');
        padre.classList.add('recurso-visible');
      }

    } else {
      item.style.display = 'none';
    }
  });
}

let indiceSeleccionado = -1;

document.getElementById('barraBusqueda').addEventListener('keydown', function (e) {
  const visibles = Array.from(document.querySelectorAll('section ul li'))
    .filter(li => li.style.display !== 'none');

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    indiceSeleccionado = (indiceSeleccionado + 1) % visibles.length;
    resaltarSeleccion(visibles);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    indiceSeleccionado = (indiceSeleccionado - 1 + visibles.length) % visibles.length;
    resaltarSeleccion(visibles);
  } else if (e.key === 'Enter') {
    if (visibles[indiceSeleccionado]) {
      visibles[indiceSeleccionado].scrollIntoView({ behavior: 'smooth', block: 'center' });
      visibles[indiceSeleccionado].style.backgroundColor = '#d6f5d6';
      setTimeout(() => visibles[indiceSeleccionado].style.backgroundColor = '', 1000);

      // Si hay un enlace dentro, lo activa
      const link = visibles[indiceSeleccionado].querySelector('a');
      if (link) link.click();
    }
  }
});

function resaltarSeleccion(lista) {
  lista.forEach((li, i) => {
    li.style.outline = (i === indiceSeleccionado) ? '2px solid #0077cc' : '';
  });
}

// Atajo de teclado: Ctrl + B para enfocar la barra
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    const buscador = document.getElementById('barraBusqueda');
    buscador.focus();
    buscador.select();
  }
});

// También permite presionar Enter para activar la búsqueda
document.getElementById('barraBusqueda').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    buscarRecursos();
  }
});

function toggleAsistente() {
  const asistente = document.getElementById('asistenteVirtual');
  asistente.classList.toggle('recurso-oculto');
}

function cerrarAsistente() {
  document.getElementById('asistenteVirtual').classList.add('recurso-oculto');
}

function responderDesdeBoton(preguntaClave) {
  const respuestas = {
    recursos: "Esta página ofrece recursos en audio, video, documentos PDF, cursos inclusivos y herramientas adaptativas para facilitar el aprendizaje de personas con discapacidad.",
    audio: "Para subir y reproducir un audio, selecciona la opción 'Material en audio', luego carga tu archivo .mp3 y se reproducirá automáticamente. Puedes detenerlo o transcribirlo a texto.",
    pdf: "Para ver un documento PDF, selecciona 'Ver documento PDF' y luego carga tu archivo .pdf. Se mostrará dentro de la página para su lectura directa.",
    cursos: "Puedes subir un curso en formato PDF o DOCX desde la sección 'Cursos inclusivos'. Si es PDF, se mostrará para su lectura en el visor.",
    herramientas: "Las herramientas adaptativas incluyen archivos útiles como lupa digital, lectores de pantalla o teclados virtuales. Solo sube el archivo y podrás verlo o descargarlo.",
    pagina: "Esta página está diseñada para ofrecer acceso inclusivo a recursos educativos digitales para personas con discapacidades visuales, auditivas o cognitivas.",
    buscador: "El buscador permite encontrar rápidamente recursos cargados en la página. Puedes escribir palabras clave y se resaltarán los resultados.",
    funciones: "Además de mostrar contenido multimedia y documentos, puedes exportar historiales, activar contraste alto, aumentar o reducir el tamaño del texto, y transcribir audios a texto."
  };

  const respuesta = respuestas[preguntaClave] || "Lo siento, no tengo una respuesta para eso todavía.";
  const chat = document.getElementById("conversacion");

  const mensajeBot = document.createElement('p');
  mensajeBot.textContent = "🤖: " + respuesta;
  chat.appendChild(mensajeBot);

  const voz = new SpeechSynthesisUtterance(respuesta);
  voz.lang = "es-ES";
  window.speechSynthesis.speak(voz);

  chat.scrollTop = chat.scrollHeight;
}

