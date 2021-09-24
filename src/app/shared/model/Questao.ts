
/**
* Questao é o modelo que representa uma questão
* @field numero é o numero da questão em uma avaliação
* @field PerguntaResposta é um array que em sua primeira posição tem o id da pergutam e nas posições seguintes o id das respostas da questão
*/
export interface Questao {
  id?: number;
  idAvaliacao: number;
  numero: number;
  perguntaResposta: number[]
}
