$(document).ready(function () {
	$('.tabs').tabs();
	$('.modal').modal();
	$('.collapsible').collapsible();
<<<<<<< HEAD
	$('.sidenav').sidenav();
=======
        $('.sidenav').sidenav();
>>>>>>> 60cbe666448046ed3b11147b88a70e2e7a263499
});

$('#inicioToggle').click(function () {
	matrizesSoma = [];
	matrizResultante = [];
	$('#soma').hide();
	$('#multiplicacao').hide();
});

$('#somaToggle').click(function () {
	$('#multiplicacao').hide();
	$('#soma').show();
});

$('#multiplicacaoToggle').click(function () {
	$('#soma').hide();
	$('#multiplicacao').show();
});

/**
	------------------- SOMA MATRIZES -------------------------
*/

let matrizSoma = {}; // propriedades da matriz
let matrizesSoma = []; // array com as matrizes para soma
let matrizResultante = []; // array com a matriz resultante
let valMatrizSoma = []; // array auxiliar para armazenar matrizes

/**
 * Zera todas as variáveis relacionadas a soma de matrizes
 */
function zerarVariaveisSoma() {
	matrizSoma = {};
	matrizesSoma = [];
	matrizResultante = [];
	valMatrizSoma = [];
}

/**
 * Desabilita os campos colunas e linhas caso já haja uma matriz inserida
 */
$('#inserirMatrizSoma').click(function () {
	if (matrizSoma.linhas) {
		$('#Slinhas').prop('disabled', true);
	} else {
		$('#Slinhas').prop('disabled', false);
	}
	if (matrizSoma.colunas) {
		$('#Scolunas').prop('disabled', true);
	} else {
		$('#Scolunas').prop('disabled', false);
	}
});

/**
 * Limpa o histórico de matrizes
 */
$('#limparSMatriz').click(function () {
	zerarVariaveisSoma();
	gerarRepresentacaoSoma();
});

/**
 * Funções para gerar os inputs para os campos da matriz
 */
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
	for (let i = 0; i < matrizSoma.linhas; i++) {
		for (let j = 0; j < matrizSoma.colunas; j++) {
			//console.log('a' + (i + 1) + '' + (j + 1));
			formulario += '<div class="input-field campo-matriz-div"><input class="campo-matriz" placeholder="" type="text" class="validate"></div>';
		}
		formulario += '<br/>';
	}
	$('.formSMatriz').html(formulario);
}

/**
 * Insere a nova matriz no array de matrizes
 */
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

/**
 * Calcula a soma das matrizes
 */
$('#calcularSomaMatriz').click(function () {
	for (let i = 0; i < matrizSoma.linhas; i++) {
		let novaLinha = [];
		for (let j = 0; j < matrizSoma.colunas; j++) {
			novaLinha.push(0);
		}
		matrizResultante.push(novaLinha);
	}
	for (let n = 0; n < matrizesSoma.length; n++) {
		for (let i = 0; i < matrizSoma.linhas; i++) {
			for (let j = 0; j < matrizSoma.colunas; j++) {
				matrizResultante[i][j] += parseInt(matrizesSoma[n][i][j]);
			}
		}
	}
	gerarRepresentacaoSoma();
});

/**
 * Gera a representação da operação em Latex
 */
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
		if (matrizResultante.length > 0) {
			representacao += '\\begin{pmatrix}';
			for (let i = 0; i < matrizSoma.linhas; i++) {
				for (let j = 0; j < matrizSoma.colunas; j++) {
					representacao += matrizResultante[i][j];
					if (j != matrizResultante[1].length - 1) {
						representacao += ' & ';
					}
				}
				if (i != matrizResultante.length - 1) {
					representacao += ' \\\\';
				}
			}
			representacao += '\\end{pmatrix}';
		}
		representacao += ' $$';
		matrizResultante = [];
		$('#representacaoSoma').html(representacao);
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "representacaoSoma"]);
	}
}

/**
* -------------- MULTIPLICAÇÃO MATRIZ-ESCALAR --------------------
*/

let matrizME = [];
let dimensoesMatrizME = {};
let resultadoME = [];
let escalar;

$('#calcular-escalar').click(function () {
	multiplicarMatrizEscalar();
});

$('#inserirEscalarM').click(function () {
	escalar = $('#EscalarM').val();
	gerarRepresentacaoMultiplicacaoEscalar();
});

$('#limparME').click(function () {
	dimensoesMatrizME = {};
	resultadoME = [];
	escalar = undefined;
	matrizME = [];
	gerarRepresentacaoMultiplicacaoEscalar();
});

$('#inserirMEMatriz').click(function () {
	let arr = $('.campo-matriz-me');
	let aux = 0;
	let novaMatriz = [];

	for (let i = 0; i < dimensoesMatrizME.linhas; i++) {
		let novaLinha = [];
		for (let j = 0; j < dimensoesMatrizME.colunas; j++) {
			novaLinha.push(arr[aux].value);
			aux++;
		}
		novaMatriz.push(novaLinha);
	}

	matrizME = novaMatriz;
	gerarRepresentacaoMultiplicacaoEscalar();
	$('#modalInserirMatrizME').hide();
});

$('#MEcolunas').keyup(function () {
	dimensoesMatrizME.colunas = $(this).val();
	gerarMatrizEscalar();
});

$('#MElinhas').keyup(function () {
	dimensoesMatrizME.linhas = $(this).val();
	gerarMatrizEscalar();
});

function gerarMatrizEscalar() {
	if (!dimensoesMatrizME.linhas || !dimensoesMatrizME.colunas) {
		return;
	}
	let formulario = '';
	for (let i = 0; i < dimensoesMatrizME.linhas; i++) {
		for (let j = 0; j < dimensoesMatrizME.colunas; j++) {
			//console.log('a' + (i + 1) + '' + (j + 1));
			formulario += '<div class="input-field campo-matriz-div"><input class="campo-matriz-me" placeholder="" type="text" class="validate"></div>';
		}
		formulario += '<br/>';
	}
	$('.formME').html(formulario);
}

function multiplicarMatrizEscalar() {
	let matriz = [];

	for (let i = 0; i < matrizME.length; i++) {
		let novaLinha = [];
		for (let j = 0; j < matrizME[0].length; j++) {
			novaLinha.push(matrizME[i][j] * escalar);
		}
		matriz.push(novaLinha);
	}

	resultadoME = matriz;
	gerarRepresentacaoMultiplicacaoEscalar();
}

function gerarRepresentacaoMultiplicacaoEscalar() {
	let representacao = '$$ ';

	if (matrizME.length > 0) {



		representacao += '\\begin{pmatrix}';

		for (let i = 0; i < matrizME.length; i++) {
			for (let j = 0; j < matrizME[0].length; j++) {
				representacao += matrizME[i][j];
				if (j != matrizME[0].length - 1) {
					representacao += ' & ';
				}
			}
			if (i != matrizME.length - 1) {
				representacao += ' \\\\';
			}
		}

		representacao += '\\end{pmatrix}';

	}

	if (escalar) {
		representacao += ' * ' + escalar;
	}

	if (resultadoME.length > 1) {
		representacao += ' = ';
		representacao += '\\begin{pmatrix}';
		for (let i = 0; i < resultadoME.length; i++) {
			for (let j = 0; j < resultadoME[0].length; j++) {
				representacao += resultadoME[i][j];
				if (j != resultadoME[0].length - 1) {
					representacao += ' & ';
				}
			}
			if (i != resultadoME.length - 1) {
				representacao += ' \\\\';
			}
		}

		representacao += '\\end{pmatrix}';
	}

	representacao += ' $$';

	$('#representacao-escalar').html(representacao);
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, "representacao-escalar"]);
}

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





