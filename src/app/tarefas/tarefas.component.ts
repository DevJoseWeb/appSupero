import {Component, OnInit} from "@angular/core";
import {TarefasService} from "./tarefas.service";
import {TarefaDto} from "./tarefa.dto";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

console.log('O componente \"TarefasComponent\" foi carregado sincronicamente!');

@Component({
  selector: 'tarefas',
  templateUrl: 'tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent implements OnInit {

  /**
   * FormGroup utilizado no <form> de nova tarefa.
   *
   * Utiliza de ReactiveForms para realizar as validações.
   *
   * Em aplicações de maior escala esse FormGroup pode ser montado em uma Classe
   * externa com base na funcionalidade. Exemplo: ValidacaoNovaNota.
   *
   * Além de separar bastante a implementação, permite que a view faça a troca de estados do fomulário, como
   * validações de acordo com parametros ou flags de maneira mais eficiente, sem gerar código complexo no Component
   * principal da view.
   */
  public formulario: FormGroup;

  /**
   * Data Object para a edição e adição de uma nota tarefa
   * @type {TarefaDto}
   */
  public tarefaEdicao: TarefaDto = new TarefaDto();

  /**
   * Listas de tarefas para exibição adequada na view
   * @type {array}
   */
  public tarefasPendentes: TarefaDto[] = [];
  public tarefasConcluidas: TarefaDto[] = [];

  /**
   * Controles de tela e loading
   *
   * Pode ser extraido para uma camada de Estado de View, assim como o componente pode extender um componente
   * Abstract, que implementa opções de loading globais, facilitando algumas telas com padrões.
   * @type {boolean}
   */
  public inserindo: boolean = false;
  public buscando: boolean = false;

  /**
   * Construtor
   * @param tarefasService
   * @param formBuilder
   */
  constructor(private tarefasService: TarefasService,
              private formBuilder: FormBuilder) {
    this.initializeForm(formBuilder);
  }

  /**
   * Função padrão do Angular utilizada para executar
   * operações depois que a view é inicializada
   */
  public ngOnInit(): void {
    this.buscarTarefas();
  }

  /**
   * Verifica o id do dto de tarefa sendo editado ou adicionado, se o mesmo existir chama a função de
   * inserir uma nova tarefa, caso contrário, atualiza a tarefa sendo editada.
   */
  public salvarTarefa() {
    if (this.formulario.invalid || this.inserindo) {
      return;
    }

    this.inserindo = true;

    if (!this.tarefaEdicao.id) {
      this.inserirNovaTarefa();
    } else {
      this.atualizarTarefa();
    }
  }

  /**
   * Insere nova tarefa
   */
  private inserirNovaTarefa() {
    this.tarefasService.inserirTarefa(this.tarefaEdicao)
      .map(res => res.json()).subscribe(
      (tarefa: TarefaDto) => {
        this.tarefasPendentes.push(tarefa);
        this.limparFormulario();
        this.inserindo = false;
      },
      () => this.inserindo = false
    );
  }

  /**
   * Faz a atualização da tarefa depois de ter seus dados editados
   */
  private atualizarTarefa() {
    this.tarefasService.editarTarefa(this.tarefaEdicao)
      .subscribe(() => {
          this.buscarTarefas();
          this.limparFormulario();
          this.inserindo = false;
        },
        () => this.inserindo = false
      );
  }

  /**
   * Exclui uma tarefa de uma lista específica.
   * @param tarefa
   */
  public excluirTarefa(lista: TarefaDto[], tarefa: TarefaDto) {
    let index = lista.indexOf(tarefa);
    lista.splice(index, 1);

    this.tarefasService.excluirTarefa(tarefa.id).subscribe(
      null, () => lista.splice(index, 0, tarefa)
    );
  }

  /**
   * Faz a cópida do objeto selecionado da lista e seta no objeto de edição
   * para efetuar a edição da tarefa.
   * @param tarefa
   */
  public editarTarefa(tarefa: TarefaDto) {
    this.tarefaEdicao = {...tarefa};
  }

  /**
   * Marca tarefa como não concluida
   * @param tarefa
   */
  public marcarTarefaComoNaoConcluida(tarefa: TarefaDto) {
    tarefa.concluida = false;

    this.tarefasService.marcarTarefaComoNaoConcluida(tarefa.id).subscribe(
      () => this.buscarTarefas(),
      () => tarefa.concluida = true
    );
  }

  /**
   * Marca tarefa como concluída
   * @param tarefa
   */
  public marcarTarefaComoConcluida(tarefa: TarefaDto) {
    tarefa.concluida = true;

    this.tarefasService.marcarTarefaComoConcluida(tarefa.id).subscribe(
      () => this.buscarTarefas(),
      () => tarefa.concluida = false
    );
  }

  /**
   * Inicializa o formulário com os valores e Validators padrões.
   *
   * Pode ser inicializado em uma calsse externa com base na funcionalidade e parametros.
   * Exemplo: ValidacaoNovaNota.
   *
   * @param fb
   */
  private initializeForm(fb: FormBuilder) {
    this.formulario = fb.group({
      titulo: [null, [Validators.required]],
      descricao: [null],
    });
  }

  /**
   * Busca todas as tarefas
   */
  private buscarTarefas() {
    this.buscando = true;
    this.tarefasService.buscarTarefas().subscribe(
      (tarefas) => {
        this.buscando = false;
        this.populaListaComBaseNoStatus(tarefas);
      }, () => {
        this.buscando = false;
      }
    );
  }

  /**
   * Popula as listas de tarefas 'tarefasConcluidas' e 'tarefasPendentes' com base no boolean 'concluida'
   * do TarefaDto.
   *
   * @param tarefas
   */
  private populaListaComBaseNoStatus(tarefas: TarefaDto[]) {
    this.tarefasConcluidas = [];
    this.tarefasPendentes = [];

    tarefas.forEach((tarefa: TarefaDto) => {
      if (tarefa.concluida) {
        this.tarefasConcluidas.push(tarefa);
      } else {
        this.tarefasPendentes.push(tarefa);
      }
    });
  }

  /**
   * Limpa os valores do dto de edição de tarefa e do formulário
   */
  private limparFormulario() {
    this.tarefaEdicao = new TarefaDto();
    this.formulario.get('titulo').setValue('');
    this.formulario.get('descricao').setValue('');
  }
}
