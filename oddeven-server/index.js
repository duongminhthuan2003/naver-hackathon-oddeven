const WebSocket = require('ws');

const winnerSet = [
  [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24],
  [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24],
  [0,6,12,18,24], [4,8,12,16,20],
];

let gameOver = false;
let winner = null;
let winningLine = null;
const players = { odd: null, even: null };


function checkWinner(board) {
  for (const line of winnerSet) {
    const allOdd  = line.every(i => board[i] % 2 === 1);
    const allEven = line.every(i => board[i] > 0 && board[i] % 2 === 0);
    if (allOdd)  return { winner: 'odd',  line };
    if (allEven) return { winner: 'even', line };
  }
  return null;
}

function assignPlayer(ws) {
  if (!players.odd)  { players.odd  = ws; ws.role = 'odd';  return 'odd'; }
  if (!players.even) { players.even = ws; ws.role = 'even'; return 'even'; }
  return null;
}

const server = new WebSocket.Server({ port: 8080 });
const BOARD_SIZE = 25;
const board = Array(BOARD_SIZE).fill(0);

server.on('connection', (ws) => {
    console.log('Connected', server.clients.size);

    ws.on('close', () => {
        if (ws.role === 'odd' && players.odd  === ws) players.odd  = null;
        if (ws.role === 'even' && players.even === ws) players.even = null;

        console.log('Disconnected', server.clients.size);

        if (!gameOver) {
            gameOver = true;
            winner = null;
            winningLine = null;

            server.clients.forEach((socket) => {
                socket.send(JSON.stringify({ 
                    type: 'GAME_OVER', 
                    data: {
                        board: board,
                        gameOver: gameOver,
                        winner: null,
                        winningLine: null,
                        reason: 'disconnected',
                    },
                }));
            }
        )}
    });
    ws.on('message', (message) => {
        const { type, data } = JSON.parse(message.toString());

        switch (type) {
            case 'join':
                const role = assignPlayer(ws);
                if (!role) {
                    ws.send(JSON.stringify({ type: 'REJECT' }));
                    return;
                }

                ws.send(JSON.stringify({ 
                    type: 'welcome', 
                    data: {
                        player: role,
                        board: board,
                        gameOver: gameOver,
                        winner: winner,
                        winningLine: winningLine,
                    },
                }));

                if (!(players.odd && players.even)) {
                    server.clients.forEach((socket) => 
                        socket.send(JSON.stringify({ 
                            type: 'WAITING', 
                    data: {
                        board: board,
                        gameOver: gameOver,
                        winner: winner,
                        winningLine: winningLine,
                    },
                  })));
                } else {
                    for (let i = 0; i < BOARD_SIZE; i++) {
                        board[i] = 0;
                    }
                    gameOver = false;
                    winner = null;
                    winningLine = null;

                    server.clients.forEach((socket) => 
                        socket.send(JSON.stringify({ 
                            type: 'SYNC', 
                    data: {
                        board: board,
                        gameOver: gameOver,
                        winner: winner,
                        winningLine: winningLine,
                    }}))),

                    server.clients.forEach((socket) => 
                        socket.send(JSON.stringify({ 
                            type: 'START', 
                    data: {
                        board: board,
                        gameOver: gameOver,
                        winner: winner,
                        winningLine: winningLine,
                    },
            })));
                }
                break;

            case 'INCREMENT':
                if (gameOver) return;

                const index = data.index;
                if (index < 0 || index >= BOARD_SIZE) return;

                board[index] += 1;
                
                server.clients.forEach((socket) => {
                    socket.send(JSON.stringify({ 
                        type: 'UPDATE', 
                        data: {
                            index: index, 
                            value: board[index], 
                        }
                    }));
                });

                const result = checkWinner(board);

                if (result && !gameOver) {
                gameOver = true;
                winner = result.winner;
                winningLine = result.line;

                server.clients.forEach((socket) => 
                    socket.send(JSON.stringify({
                        type: 'GAME_OVER',
                        data: { 
                            winner: winner, 
                            winningLine: winningLine 
                        }
                    })));
                }
            break;
            
            case 'RESET':
                for (let i = 0; i < BOARD_SIZE; i++) {
                    board[i] = 0;
                }
                gameOver = false;
                winner = null;
                winningLine = null;

                server.clients.forEach((socket) => {
                    socket.send(JSON.stringify({ 
                        type: 'SYNC', 
                        data: { 
                            board: board,
                            gameOver: gameOver,
                            winner: winner,
                            winningLine: winningLine,
                        } 
                    }));
                });

                if (players.odd && players.even) {
                    server.clients.forEach((socket) => {
                    socket.send(JSON.stringify({
                        type: 'START',
                        data: { board, gameOver, winner, winningLine }
                    }));
                    });
                } else {
                    server.clients.forEach((socket) => {
                    socket.send(JSON.stringify({
                        type: 'WAITING',
                        data: { board, gameOver, winner, winningLine }
                    }));
                    });
                }
            break;

            default:
                break;
        }
    })
});