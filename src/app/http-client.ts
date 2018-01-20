import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {API_URL} from "./environment";

@Injectable()
export class HttpClient {

  constructor(private http: Http) {
  }

  /**
   * Encapsula o metodo GET do Http do Angular com endpoint baseado na build do webpack
   *
   * @param url
   * @param options
   * @returns {Observable<R>}
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.get(url, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  /**
   * Encapsula o metodo POST do Http do Angular com endpoint baseado na build do webpack
   *
   * @param url
   * @param body
   * @param options
   * @returns {Observable<R>}
   */
  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.post(url, body, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  /**
   * Encapsula o metodo PUT do Http do Angular com endpoint baseado na build do webpack
   *
   * @param url
   * @param body
   * @param options
   * @returns {Observable<R>}
   */
  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.put(url, body, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  /**
   * Encapsula o metodo DELETE do Http do Angular com endpoint baseado na build do webpack
   *
   * @param url
   * @param options
   * @returns {Observable<R>}
   */
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.updateUrl(url);
    return this.http.delete(url, this.getRequestOptionArgs(options))
      .catch((res: Response) => {
        this.handleError(res);
        return Observable.throw(res);
      });
  }

  /**
   * Atualiza requisição com a URL da API do backend definida pela build do webpack
   * @param req
   * @returns {string}
   */
  private updateUrl(req: string) {
    return API_URL + req;
  }

  /**
   * Atualiza as opções de headers
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');

    /**
     * Adiciona token a headers de acordo com os dados do usuário logado.
     * Não implementado neste exemplo
     */
    // options.headers.append('Authorization', this.usuarioLogadoService.getToken());

    return options;
  }

  /**
   * Valida response do servidor em casos de erro de autenticação
   * Não implementado para este exemplo
   * @param res
   */
  private handleError(res: Response) {
    // if (res.status === 401 || res.status === 403) {
    //   this.router.navigate([ROUTE_NAMES.LOGIN]);
    // }
  }
}
