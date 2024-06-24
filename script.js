// use tests in console
// escapeHTMLPolicy = trustedTypes.createPolicy('default', {
//   createHTML: (string) => string,
//   createScriptURL: (string) => string,
//   createScript: (string) => string,
// });
// const escala = document.createElement('escala');
// document.body.appendChild(escala);
// escala.id = 'escala';
// escala.classList.add('material-icons', 'escala-minimize');

const casesescala = () => {


    //Função para criar folha de estilo css a aplicar no head
    const createStyle = (atribute) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = atribute;
      return document.head.appendChild(link);
    };
  
    //Função para mover o elemento
    const dragElement = (element) => {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      // Função chamada quando o mouse é pressionado sobre o elemento arrastável
      const dragMouseDown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };
      // Verifica se existe um elemento com o id do elemento arrastável seguido de 'moove'
      // Se existir, permite arrastar o elemento por esse elemento secundário, caso contrário, permite arrastar o próprio elemento
      if (document.getElementById(element.id + 'moove')) {
        document.getElementById(element.id + 'moove').onmousedown = dragMouseDown;
      } else {
        element.onmousedown = dragMouseDown;
      }
      // Função chamada enquanto o mouse é movido após o pressionamento inicial
      const elementDrag = (e) => {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Obter o tamanho da janela
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        // Obter a posição máxima permitida do elemento
        const maxPosX = windowWidth - element.offsetWidth;
        const maxPosY = windowHeight - element.offsetHeight;
        // Defina a nova posição do elemento dentro dos limites da janela
        const newPosX = element.offsetLeft - pos1;
        const newPosY = element.offsetTop - pos2;
        element.style.left = `${Math.min(Math.max(newPosX, 0), maxPosX)}px`;
        element.style.top = `${Math.min(Math.max(newPosY, 0), maxPosY)}px`;
      };
      // Função chamada quando o mouse é liberado, parando o arraste
      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
    };
  
    //Função para alterar o tamanho do elemento
    const resizeWindow = (element) => {
      // Cria um elemento 'div' para ser o redimensionador
      const resizer = document.createElement('div');
      resizer.className = 'resizer'; // Define uma classe para o redimensionador (pode ser estilizado usando CSS)
      resizer.style.width = '10px'; // Define a largura do redimensionador
      resizer.style.height = '10px'; // Define a altura do redimensionador
      resizer.style.background = 'none'; // Define o plano de fundo do redimensionador (pode ser estilizado com cores)
      resizer.style.position = 'absolute'; // Define a posição como absoluta
      resizer.style.right = 0; // Alinha o redimensionador à direita
      resizer.style.bottom = 0; // Alinha o redimensionador à parte inferior
      resizer.style.cursor = 'se-resize'; // Define o cursor do mouse ao passar sobre o redimensionador
      element.appendChild(resizer); // Adiciona o redimensionador como filho do elemento alvo
      // Função chamada quando o mouse é pressionado sobre o redimensionador
      const initResize = (e) => {
        window.addEventListener('mousemove', resize); // Escuta o evento de movimento do mouse para redimensionar
        window.addEventListener('mouseup', stopResize); // Escuta o evento de liberação do mouse para parar o redimensionamento
      };
      resizer.addEventListener('mousedown', initResize); // Escuta o evento de pressionamento do mouse no redimensionador
      // Função chamada durante o movimento do mouse após o pressionamento inicial
      const resize = (e) => {
        const maxWidth = window.innerWidth - element.offsetLeft; // Largura máxima permitida do elemento
        const maxHeight = window.innerHeight - element.offsetTop; // Altura máxima permitida do elemento
        const newWidth = Math.min(e.clientX - element.offsetLeft, maxWidth); // Nova largura calculada
        const newHeight = Math.min(e.clientY - element.offsetTop, maxHeight); // Nova altura calculada
        element.style.width = newWidth + 'px'; // Define a largura do elemento
        element.style.height = newHeight + 'px'; // Define a altura do elemento
      };
      // Função chamada quando o mouse é liberado, parando o redimensionamento
      const stopResize = (e) => {
        window.removeEventListener('mousemove', resize); // Remove o ouvinte do evento de movimento do mouse
        window.removeEventListener('mouseup', stopResize); // Remove o ouvinte do evento de liberação do mouse
      };
    };
  
    // Função que trata a exibição do conteúdo de acordo com a aba selecionada
    const handleTabClick = (tabId) => {
      // Remove a classe 'highlight' de todos os botões das abas
      document.querySelectorAll('.highlight').forEach((tabButton) => {
        tabButton.classList.remove('highlight');
      });
      // Adiciona a classe 'highlight' ao botão da aba selecionada
      const selectedTabButton = document.querySelector(`[data-abas="${tabId}"]`);
      selectedTabButton.classList.add('highlight');
      // Esconde todos os conteúdos exibidos anteriormente
      document.querySelectorAll('[id^="content"]').forEach((contentElement) => {
        contentElement.classList.remove('show');
      });
      // Exibe o conteúdo correspondente à aba selecionada
      const selectedTabContent = document.getElementById(tabId);
      if (selectedTabContent) {
        selectedTabContent.classList.add('show');
      }
    };
  
    // Aplicação de estilos
    createStyle('https://tools-automate.github.io/escala-ocorrencia/assets/css/style.css');
    createStyle('https://fonts.googleapis.com/icon?family=Material+Icons');
  
    // Aplica dragElement no elemeto escala
    dragElement(escala);
  
    // Aplica função resizeWindow
    resizeWindow(escala);
  
    // Obtém todos os elementos que possuem a classe 'minimize' ou 'escala-minimize' e adiciona o ouvinte de evento a cada um deles
    const minimizeWindowElements = document.querySelectorAll(
      '[class*="minimize"]',
    );
    minimizeWindowElements.forEach((e) => {
      e.addEventListener('click', (e) => {
        if (e.target.matches('.escala-minimize')) {
          e.target.classList.remove('escala-minimize');
          e.target.classList.remove('material-icons');
        }
        if (e.target.matches('.minimize')) {
          escala.classList.add('escala-minimize');
          escala.classList.add('material-icons');
        }
      });
    });
  
    // Adiciona um ouvinte de clique para o elemento com ID 'dark-mode' e liga e desliga a a classe dark-theme do elemento escala
    document.querySelector('#dark-mode').addEventListener('click', (e) => {
      if (escala.classList.contains('dark-theme')) {
        escala.classList.remove('dark-theme');
        e.target.textContent = 'dark_mode';
      } else {
        escala.classList.add('dark-theme');
        e.target.textContent = 'light_mode';
      }
    });
  };
  
  const structureHTML = fetch(
    'https://michelemorais2203.github.io/ScriptQA1/',
  ).then((e) => e.text());
  structureHTML.then((e) => {
    escala.innerHTML = e;
    casesescala();
    console.log('HTML aplicado!');
  });