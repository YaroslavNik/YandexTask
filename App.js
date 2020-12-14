// Инициализация констант.
const 
    rows = 8,
    cols = 7;

// Функция создания и заполнения массива на основании входящих данных.

const createMatrix = (rows, cols) => {

    let arr = new Array(rows)

    for(let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);

        for(let j = 0; j < cols; j++) {
            arr[i][j] = Math.round(Math.random());
        }
    }
    return arr
}

// Функция получения нового состояния матрицы на основании предыдущего.

const updateMatrix = (matrixPrev) => {

    // const matrixCur = createMatrix(rows, cols);
    const matrixCur = JSON.parse(JSON.stringify(matrixPrev))
    
    let flag = false;

    for(let i = 0; i < matrixPrev.length; i++) {
        for(let j = 0; j < matrixPrev[i].length; j++) {

            if(matrixPrev[i][j] === 0) {

                if(getAlive(i, j, matrixPrev) === 3) {
                    matrixCur[i][j] = 1
                    flag = true
                } else matrixCur[i][j] = 0
            } 

            else {
                
                switch (getAlive(i, j, matrixPrev) - 1) {
                    
                    case 0:
                    case 1:
                    default:
                        matrixCur[i][j] = 0
                        flag = true
                    break;

                    case 2:
                    case 3:
                        matrixCur[i][j] = 1
                    break;
                }
            } 
            
        }
    }

    console.log(matrixCur)
    flag ? setTimeout(() => updateMatrix(matrixCur), 1000) : console.log('Матрица уравновешена')
}

// Функция подсчета числа живых соседей ячейки матрицы.

const getAlive = (row  , col, arr) => {
    let live = 0;

    let iZeroIndex = row === 0 ? row : row - 1
    let jZeroIndex = col === 0 ? col : col - 1
    let iLenght = row === rows - 1 ? row : row + 1
    let jLenght = col === cols - 1 ? col : col + 1

    for(i = iZeroIndex;  i <= iLenght; i++) {
        for(j = jZeroIndex ; j <= jLenght; j++) {
            live += arr[i][j]
        }
    }
    return live;
}

// Запуск программы

const matrixInit = createMatrix(rows, cols)
updateMatrix(matrixInit)
