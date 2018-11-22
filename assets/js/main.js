$(document).ready(function () {
	$('.tabs').tabs();
	$('.modal').modal();
	$('.collapsible').collapsible();
});

$('#inicioToggle').click(function () {
	matrizesSoma = [];
	$('#soma').hide();
});

$('#somaToggle').click(function () {
	$('#soma').show();
});

/**
 * ------------------------------------------------------------
 * Funções para modal da Soma de Matrizes 
 */

let matrizSoma = {};
let matrizesSoma = [];
let valMatrizSoma = [];

$('#limparSMatriz').click(function () {
	matrizesSoma = [];
	gerarRepresentacaoSoma();
});

$('#Scolunas').keyup(function () {
	matrizSoma.colunas = $(this).val();
	gerarMatrizSoma();
});

$('#Slinhas').keyup(function () {
	matrizSoma.linhas = $(this).val();
	gerarMatrizSoma();
});

function gerarMatrizSoma() {

	if (!matrizSoma.linhas || !matrizSoma.colunas) {
		return;
	}

	let formulario = '';
	//formulario += '<div class="input-field campo-matriz"><input placeholder="" id="" type="text" class="validate"></div>'
	for (let i = 0; i < matrizSoma.linhas; i++) {

		for (let j = 0; j < matrizSoma.colunas; j++) {
			//console.log('a' + (i + 1) + '' + (j + 1));
			formulario += '<div class="input-field campo-matriz-div"><input class="campo-matriz" placeholder="" type="text" class="validate"></div>';
		}

		formulario += '<br/>';
	}

	$('.formSMatriz').html(formulario);
}

$('#inserirSMatriz').click(function () {
	let arr = $('.campo-matriz');
	let aux = 0;

	let novaMatriz = [];

	for (let i = 0; i < matrizSoma.linhas; i++) {
		let novaLinha = [];
		for (let j = 0; j < matrizSoma.colunas; j++) {
			novaLinha.push(arr[aux].value);
			aux++;
		}
		novaMatriz.push(novaLinha);
	}

	matrizesSoma.push(novaMatriz);

	gerarRepresentacaoSoma();
});


function gerarRepresentacaoSoma() {
	if (matrizesSoma.length == 0) {
		$('#representacaoSoma').html('');
	} else {
		let representacao = '$$ ';

		for (let n = 0; n < matrizesSoma.length; n++) {

			if (n > 0) {
				representacao += ' + ';
			}

			representacao += '\\begin{pmatrix}';

			for (let i = 0; i < matrizesSoma[n].length; i++) {
				for (let j = 0; j < matrizesSoma[n][1].length; j++) {
					representacao += matrizesSoma[n][i][j];
					if (j != matrizesSoma[n][1].length - 1) {
						representacao += ' & ';
					}
				}
				if (i != matrizesSoma[n].length - 1) {
					representacao += ' \\\\';
				}
			}

			representacao += '\\end{pmatrix}';

			if (n == matrizesSoma.length - 1) {
				representacao += '=';
			}
		}
		representacao += ' $$';
		$('#representacaoSoma').html(representacao);
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "representacaoSoma"]);
	}
}

/**
 * ------------------------------------------------------
 */


/*
* @function ordem()
* params - matriz - recebe uma matriz quadrada
* return - retorna a ordem da matriz
*/
function ordem(matriz = []) {
	return matriz.length;
}

/*
* @function laplace()
*/
function laplace(matriz = []) {
	let ordemMatriz = ordem(matriz);

	if (ordemMatriz === 1) {
		return matriz[0]; // matriz de ordem 1
	}

	if (ordemMatriz === 2) {
		return (matriz[0][0] * matriz[1][1]) - (matriz[0][1] * matriz[1][0]); // matriz de ordem 2
	}

	let determinante = 0;

	for (let j = 0; j < ordemMatriz; j++) {
		determinante += matriz[0][j] * cofator(matriz, 0, j);
	}

	return determinante;
}

function cofator(matriz, linha, coluna) {
	let subMatriz = [];
	let ordemMatriz = ordem(matriz);
	let m = 0;

	for (let i = 1; i < ordemMatriz; i++) {
		subMatriz[m] = [];

		for (let j = 0; j < ordemMatriz; j++) {
			if (j !== coluna) {
				subMatriz[m].push(matriz[i][j]);
			}
		}

		m++;
	}

	return (coluna % 2 ? -1 : 1) * laplace(subMatriz);
}

function soma() {

}

function multiplicacaoMatrizes() {

}

function multiplicacaoEscalar() {

}

function LU() {

}

let A = [[5, 0, 1],
[-2, 3, 4],
[0, 2, -1]]

console.log(laplace(A));

/*
A = [0 0 0]
    [1 1 1]
    [2 2 2]

A = [0 0 0]
    -------
    [1|1 1]
    [2|2 2]

A = [1 1 1] remove [0]
    [2 2 2]

A = [1 1] remove [i][0]
    [2 2]
*/





