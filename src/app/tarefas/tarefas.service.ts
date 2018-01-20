import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "../http-client";
import {TarefaDto} from "./tarefa.dto";

@Injectable()
export class TarefasService {

  /**
   * Endpoint da funcionalidade
   * @type {string}
   */
  private endpoint: string = '/tarefa';

  /**
   * Endpoint específica da funcionalidade
   * @type {string}
   */
  private endpointMarcarTarefaConcluida: string = this.endpoint + '/concluida/';

  /**
   * Endpoint específica da funcionalidade
   * @type {string}
   */
  private endpointMarcarTarefaNaoConcluida: string = this.endpoint +  '/nao-concluida/';

  constructor(private http: HttpClient) {
  }

  /**
   * Inserir nova tarefa
   * @param tarefa
   * @returns {Observable<Response>}
   */
  public inserirTarefa(tarefa: TarefaDto): Observable<any> {
    return this.http.post(this.endpoint, tarefa);
  }

  /**
   * Editar tarefa
   * @param tarefa
   * @returns {Observable<Response>}
   */
  public editarTarefa(tarefa: TarefaDto): Observable<any> {
    return this.http.put(this.endpoint, tarefa);
  }

  /**
   * Excluir tarefa
   * @param idTarefa
   * @returns {Observable<Response>}
   */
  public excluirTarefa(idTarefa: number): Observable<any> {
    return this.http.delete(this.endpoint + '/' + idTarefa);
  }

  /**
   * Marcar tarefa como excluida
   * @param idTarefa
   * @returns {Observable<Response>}
   */
  public marcarTarefaComoConcluida(idTarefa: number): Observable<any> {
    return this.http.get(this.endpointMarcarTarefaConcluida + idTarefa);
  }

  /**
   * Marcar tarefa como não excluida
   * @param idTarefa
   * @returns {Observable<Response>}
   */
  public marcarTarefaComoNaoConcluida(idTarefa: number): Observable<any> {
    return this.http.get(this.endpointMarcarTarefaNaoConcluida + idTarefa);
  }

  /**
   * Busca todas as tarefas não excluidas do servidor
   * @returns {any}
   */
  public buscarTarefas(): Observable<any> {
    return Observable.create((observer) =>
      this.http.get(this.endpoint)
        .map(res => res.json())
        .subscribe(
          (data: TarefaDto[]) => observer.next(data),
          (err) => observer.error(err)
        ));
  }
}
