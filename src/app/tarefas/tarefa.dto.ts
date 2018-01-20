/**
 * Classes tratadas como Data Object para transferencia
 * de arquivos e binding com a view.
 *
 * Podem possuir Heranças 'extends BaseEntity' e métodos auxiliares para diminuir a complexidade
 * da view.
 */
export class TarefaDto {

  id: number;
  titulo: string;
  concluida: boolean;
  descricao: string;
  dataCriacao: Date;
  dataUltimaEdicao: Date;
  dataRemocao: Date;
  dataConclusao: Date;

}
