function buscaPaginaNaMemoriaPricipal(pagina, memoria) {
  const memoriaUtilizada = memoria.length
  for (let i = 0; i < memoriaUtilizada; i++) {
      if (memoria[i] === pagina) {
          return true;
      }
  }
  return false;
}

//  identifica a página que será substituida quando a memoria estiver cheia com base na utilização recente
function identificaAPaginaQueNaoSeraUsadaRecentemente(stringDeReferencia, memoria, tamanhoDaSequencia, posicao) {
  let posicaoDaPaginaQueSeraSubstituida = -1, paginaMaisDistante = posicao;
  for (let i = 0; i < memoria.length; i++) {
      let j;
      for (j = posicao; j < tamanhoDaSequencia; j++) {
          if (memoria[i] === stringDeReferencia[j]) {
              if (j > paginaMaisDistante) {
                  paginaMaisDistante = j;
                  posicaoDaPaginaQueSeraSubstituida = i;
              }
              break;
          }
      }
      // Se não há referencia futura da página, retorná-la.
      if (j === tamanhoDaSequencia) {
          return i;
      }
  }

  // If all of the frames were not in future,
  // return any of them, we return 0. Otherwise
  // we return res.
  return (posicaoDaPaginaQueSeraSubstituida === -1) ? 0 : posicaoDaPaginaQueSeraSubstituida;
}

function optimalPageReplacementAlgorithm(stringDeReferencia, tamanhoDaSequencia, capacidadeDaMemoria) {
  // inicia a memória vazia
  let memoriaPrincipal = [];

  // Itera sobre os elementos da sequência de referencia e contabiliza os HIT's e os Misses do algoritmo.
  let hit = 0;
  for (let i = 0; i < tamanhoDaSequencia + 1; i++) {
    console.log(`Os valores armazenados na memória na iteração: n° ${i} é - ${memoriaPrincipal}`);
      // Página encontrada na memória: HIT
      if(i<tamanhoDaSequencia){
        if (buscaPaginaNaMemoriaPricipal(stringDeReferencia[i], memoriaPrincipal)) {
          hit++;
          continue;
      }

      // Página não encontrada na memória: : MISS

      // Se houver espaço liver na memoria, adiciona a página
      if (memoriaPrincipal.length < capacidadeDaMemoria) {
          memoriaPrincipal.push(stringDeReferencia[i]);
      }

      // caso não tenha espaço livre na memória, procurar e trocar a página que deve ser substituida
      else {
          let j = identificaAPaginaQueNaoSeraUsadaRecentemente(stringDeReferencia, memoriaPrincipal, tamanhoDaSequencia, i + 1);
          memoriaPrincipal[j] = stringDeReferencia[i];
      }
      }
     
  }
  // console.log("No. de hits = " + hit);
  console.log("No. de misses = " + (tamanhoDaSequencia - hit));
}

let capacidadeDaMemoria = 3;


let referenciaDePaginas = [7,0,1,2,0,3,0,4,2,3,0,0,2,1,2,0,1,7];
let tamanhoDaReferenciaDePaginas = referenciaDePaginas.length;

optimalPageReplacementAlgorithm(referenciaDePaginas, tamanhoDaReferenciaDePaginas, capacidadeDaMemoria);

// let referenciaDePaginas2 = [4,6,7,8,5,6,7];
// let tamanhoDaReferenciaDePaginas2 = referenciaDePaginas2.length;
// optimalPageReplacementAlgorithm(referenciaDePaginas2, tamanhoDaReferenciaDePaginas2, capacidadeDaMemoria);
