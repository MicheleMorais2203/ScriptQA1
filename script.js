// escapeHTMLPolicy = trustedTypes.createPolicy('default', {
//   createHTML: (string) => string,
//   createScriptURL: (string) => string,
//   createScript: (string) => string,
// });

const escala = document.createElement('escala');
document.body.appendChild(escala);
escala.id = 'escala';
escala.classList.add('material-icons', 'escala-minimize');

const casesescala = () => {
    // Função para criar folha de estilo css e aplicar no head
    const createStyle = (atribute) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = atribute;
        document.head.appendChild(link);
    };

    // Função para mover o elemento
    const dragElement = (element) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        if (document.getElementById(element.id + 'moove')) {
            document.getElementById(element.id + 'moove').onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }

        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const maxPosX = windowWidth - element.offsetWidth;
            const maxPosY = windowHeight - element.offsetHeight;
            const newPosX = element.offsetLeft - pos1;
            const newPosY = element.offsetTop - pos2;

            element.style.left = `${Math.min(Math.max(newPosX, 0), maxPosX)}px`;
            element.style.top = `${Math.min(Math.max(newPosY, 0), maxPosY)}px`;
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    };

    // Função para alterar o tamanho do elemento
    const resizeWindow = (element) => {
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.style.width = '10px';
        resizer.style.height = '10px';
        resizer.style.background = 'none';
        resizer.style.position = 'absolute';
        resizer.style.right = 0;
        resizer.style.bottom = 0;
        resizer.style.cursor = 'se-resize';
        element.appendChild(resizer);

        const initResize = (e) => {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        };

        resizer.addEventListener('mousedown', initResize);

        const resize = (e) => {
            const maxWidth = window.innerWidth - element.offsetLeft;
            const maxHeight = window.innerHeight - element.offsetTop;
            const newWidth = Math.min(e.clientX - element.offsetLeft, maxWidth);
            const newHeight = Math.min(e.clientY - element.offsetTop, maxHeight);

            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
        };

        const stopResize = (e) => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        };
    };

    // Função que trata a exibição do conteúdo de acordo com a aba selecionada
    const handleTabClick = (tabId) => {
        document.querySelectorAll('.highlight').forEach((tabButton) => {
            tabButton.classList.remove('highlight');
        });

        const selectedTabButton = document.querySelector(`[data-abas="${tabId}"]`);
        selectedTabButton.classList.add('highlight');

        document.querySelectorAll('[id^="content"]').forEach((contentElement) => {
            contentElement.classList.remove('show');
        });

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

    // Gerenciar eventos de minimização
    const minimizeWindowElements = document.querySelectorAll('[class*="minimize"]');
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

    // Alternar modo escuro
    document.querySelector('#dark-mode').addEventListener('click', (e) => {
        if (escala.classList.contains('dark-theme')) {
            escala.classList.remove('dark-theme');
            e.target.textContent = 'dark_mode';
        } else {
            escala.classList.add('dark-theme');
            e.target.textContent = 'light_mode';
        }
    });

    // Adicionar botão de minimizar
    const minimizeButton = document.getElementById('minimizeButton');
    minimizeButton.addEventListener('click', () => {
        escala.style.display = 'none';

        const maximizeButton = document.createElement('button');
        maximizeButton.textContent = 'Maximize';
        maximizeButton.style.position = 'fixed';
        maximizeButton.style.top = '10px';
        maximizeButton.style.right = '10px';
        document.body.appendChild(maximizeButton);

        maximizeButton.addEventListener('click', () => {
            escala.style.display = '';
            maximizeButton.remove();
        });
    });
};

const structureHTML = fetch('https://michelemorais2203.github.io/ScriptQA1/')
    .then((response) => response.text());

structureHTML.then((html) => {
    escala.innerHTML = html;
    casesescala();
    console.log('HTML aplicado!');
});
