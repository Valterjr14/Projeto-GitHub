//Define o estado do jogo 
let gameState = 'start';
        
        //Seleciona os paddles 
        const paddle_1 = document.querySelector('.paddle_1');
        const paddle_2 = document.querySelector('.paddle_2');
        //Seleciona as paredes
        const wall_left1 = document.querySelector('.wall_left1');
        const wall_left2 = document.querySelector('.wall_left2');
        const wall_right1 = document.querySelector('.wall_right1');
        const wall_right2 = document.querySelector('.wall_right2');
        //Seleciona o placar
        const score_1 = document.querySelector('.player_1_score');
        const score_2 = document.querySelector('.player_2_score');
        //Seleciona as coordenadas dos paddles
        let paddle_1_coord = paddle_1.getBoundingClientRect();
        let paddle_2_coord = paddle_2.getBoundingClientRect();
        let paddle_common = document.querySelector('.paddle').getBoundingClientRect();
        //Seleciona as coordenadas das paredes
        const wall_left1_coord = wall_left1.getBoundingClientRect();
        const wall_left2_coord = wall_left2.getBoundingClientRect();
        const wall_right1_coord = wall_right1.getBoundingClientRect();
        const wall_right2_coord = wall_right2.getBoundingClientRect();

        //Seleciona o board (tabuleiro)
        const board = document.querySelector('.board');

        //Configurações inicias da bola e suas coordenadas 
        const initial_ball = document.querySelector('.ball');
        const ball = document.querySelector('.ball');
        const initial_ball_coord = ball.getBoundingClientRect();
        let ball_coord = initial_ball_coord;
        const board_coord = board.getBoundingClientRect();
        

        const message = document.querySelector('.message');
        let dx = Math.floor(Math.random() * 4) + 3;
        let dy = Math.floor(Math.random() * 4) + 3;
        let dxd = Math.floor(Math.random() * 2);
        let dyd = Math.floor(Math.random() * 2);
          
        //Adiciona um listener de eventos ao documento para fazer a captura dos pressionamentos de teclas
        document.addEventListener('keydown', (e) => {
          //Se a tecla pressionada for enter, o jogo começa
          if (e.key == 'Enter') {
            gameState = gameState == 'start' ? 'play' : 'start';
            //Se o jogo estiver em andamento, a bola começa a se movimentar
            if (gameState == 'play') {
              message.innerHTML = 'Game Started';
              message.style.left = 42 + 'vw';
              requestAnimationFrame(() => {
                dx = 4;
                dy = 4;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveBall(dx, dy, dxd, dyd);  
              });
            }
          }
          if (gameState == 'play') {
            //Movimentação do paddle 1 para cima, verifica se a tecla w ou W foi pressionada, se sim o paddle se move para cima garantindo que o mesmo não ultrapasse o topo do tabuleiro (com o uso do metodo Math.max())
            if (e.key == 'w' || e.key == 'W') {
              paddle_1.style.top =
                Math.max(
                  board_coord.top,
                  paddle_1_coord.top - window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }
            //Movimentação do paddle 1 para baixo, verifica se a tecla s ou S foi pressionada, se sim o paddle se move para baixo garantindo que o mesmo não ultrapasse o fundo do tabuleiro (com o uso do metodo Math.min())
            if (e.key == 's' || e.key == 'S') {
              paddle_1.style.top =
                Math.min(
                  board_coord.bottom - paddle_common.height,
                  paddle_1_coord.top + window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }
            //Movimentação do paddle 1 para a esquerda, verifica se a tecla a ou A foi pressionada, se sim o paddle se move para esquerda garantindo que o mesmo não ultrapasse a esquerda do tabuleiro (com o uso do metodo Math.max())
            if (e.key == 'a' || e.key == 'A') {
              paddle_1.style.left =
                Math.max(
                  board_coord.left,
                  paddle_1_coord.left - window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }
            //Movimentação do paddle 1 para direita, verifica se a tecla d ou D foi pressionada, se sim o paddle se move para direita garantindo que o mesmo não ultrapasse a direita do tabuleiro (com o uso do metodo Math.min())
            if (e.key == 'd' || e.key == 'D') {
              paddle_1.style.left =
                Math.min(
                  board_coord.right - (paddle_common.height*0.15),
                  paddle_1_coord.right + window.innerHeight * 0.1
                ) + 'px';
              paddle_1_coord = paddle_1.getBoundingClientRect();
            }

            //Movimentação do paddle 2 para cima, baixo, esquerda e direita. Utilizando a mesma logica do paddle 1
            if (e.key == 'ArrowUp') {
              paddle_2.style.top =
                Math.max(
                  board_coord.top,
                  paddle_2_coord.top - window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            if (e.key == 'ArrowDown') {
              paddle_2.style.top =
                Math.min(
                  board_coord.bottom - paddle_common.height,
                  paddle_2_coord.top + window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            if (e.key == 'ArrowLeft') {
              paddle_2.style.left =
                Math.max(
                  board_coord.left,
                  paddle_2_coord.left - window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            if (e.key == 'ArrowRight') {
              paddle_2.style.left =
                Math.min(
                  board_coord.right - (paddle_common.height*0.15),
                  paddle_2_coord.right + window.innerHeight * 0.1
                ) + 'px';
              paddle_2_coord = paddle_2.getBoundingClientRect();
            }
            
            //invalidar tecla alt
            if(e.key == "Alt"){
              e.preventDefault();
              alert("tecla Invalida");
            }
            //invalidar tecla enter ao iniciar o jogo.
            if(e.key == "Enter"){
              e.preventDefault();
              alert("Aperte Enter para continuar");
            }
          }
        });

        //Função de movimentação da bola onde dx é a direção horizontal, dy é a direção vertical e dxd e dyd é a direção da bola no proximo update
        function moveBall(dx, dy, dxd, dyd) {
          // verifica qual jogador chegou na marca de 5 pontos e reinicia o jogo.
          if (score_1.innerHTML == 5 || score_2.innerHTML == 5) {
          if (+score_1.innerHTML == 5) {
              exibirVencedor("Jogador 1")
            } else if (+score_2.innerHTML == 5) {
              exibirVencedor("Jogador 2")
            }
            resetarjogo()
            return
          }
          //Verifica se a bola colidiu com a borda superior do tabuleiro, se sim a direção da bola é invertida
          if (ball_coord.top <= board_coord.top) {
            dyd = 1;
          }       
          //Verifica se a bola colidiu com a borda inferior do tabuleiro, se sim a direção da bola é invertida
          if (ball_coord.bottom >= board_coord.bottom) {
            dyd = 0;
          }
          //Verifica se a bola colidiu com o paddle 1, se sim a direção da bola é invertida
          if (
            ball_coord.left <= paddle_1_coord.right &&
            ball_coord.top >= paddle_1_coord.top &&
            ball_coord.bottom <= paddle_1_coord.bottom &&
            ball_coord.right >= paddle_1_coord.left
          ) {
            dxd = 1;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com a parede esquerda 1, se sim a direção da bola é invertida
          if (
            ball_coord.left <= wall_left1_coord.right &&
            ball_coord.top >= wall_left1_coord.top &&
            ball_coord.bottom <= wall_left1_coord.bottom &&
            ball_coord.right >= wall_left1_coord.left
          ) {
            dxd = 1;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com a parede esquerda 2, se sim a direção da bola é invertida
          if (
            ball_coord.left <= wall_left2_coord.right &&
            ball_coord.top >= wall_left2_coord.top &&
            ball_coord.bottom <= wall_left2_coord.bottom &&
            ball_coord.right >= wall_left2_coord.left
          ) {
            dxd = 1;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com o paddle 2, se sim a direção da bola é invertida
          if (
            ball_coord.right >= paddle_2_coord.left &&
            ball_coord.top >= paddle_2_coord.top &&
            ball_coord.bottom <= paddle_2_coord.bottom &&
            ball_coord.left <= paddle_2_coord.right
          ) {
            dxd = 0;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com a parede direita 1, se sim a direção da bola é invertida
          if (
            ball_coord.right >= wall_right1_coord.left &&
            ball_coord.top >= wall_right1_coord.top &&
            ball_coord.bottom <= wall_right1_coord.bottom &&
            ball_coord.left <= wall_right1_coord.right
          ) {
            dxd = 0;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com a parede direita 2, se sim a direção da bola é invertida
          if (
            ball_coord.right >= wall_right2_coord.left &&
            ball_coord.top >= wall_right2_coord.top &&
            ball_coord.bottom <= wall_right2_coord.bottom &&
            ball_coord.left <= wall_right2_coord.right
          ) {
            dxd = 0;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
          }
          //Verifica se a bola colidiu com as bordas laterais do tabuleiro, se sim o placar é atualizado e a bola volta para a posição inicial
          if (
            ball_coord.left <= board_coord.left ||
            ball_coord.right >= board_coord.right
          ) {
            //Atualiza o placar
            if (ball_coord.left <= board_coord.left) {
              score_2.innerHTML = +score_2.innerHTML + 1;
            } else {
              score_1.innerHTML = +score_1.innerHTML + 1;
            }
            gameState = 'start';   
            ball_coord = initial_ball_coord;
            ball.style = initial_ball.style;
            message.innerHTML = 'Press Enter to Play Pong';
            message.style.left = 38 + 'vw'; 
            return;
          }
          // Atualiza as coordenadas da bola
          ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
          ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
          ball_coord = ball.getBoundingClientRect();
          // Chama a função novamente
          requestAnimationFrame(() => {
          moveBall(dx, dy, dxd, dyd);
          });
        } 
        // Essa função é usada quando o jogador atinge a marca de 5 pontos e reinica a posição da bola e do jogador 1 e 2.
        function resetarjogo() {
          score_1.innerHTML = "0"
          score_2.innerHTML = "0"
          paddle_1.style.top = "50%"
          paddle_2.style.top = "50%"
          ball.style = initial_ball.style
          ball_coord = initial_ball_coord
          gameState = "start"
          message.innerHTML = "Press Enter to Play Pong"
          message.style.left = "38vw"
        }
        // Essa função cria um html para exibir qual jogador venceu a partida.
        function exibirVencedor(vencedor) {
          const vencedorElement = document.createElement("div")
          vencedorElement.classList.add("vencedor")
          vencedorElement.textContent = `Vencedor: ${vencedor}`
          document.body.appendChild(vencedorElement);
          setTimeout(() => {
            const vencedorElement = document.querySelector(".vencedor");
            if (vencedorElement) {
              vencedorElement.remove(); // Remove o elemento de vitória após 3 segundos
            }
          }, 3000); 
        }

        