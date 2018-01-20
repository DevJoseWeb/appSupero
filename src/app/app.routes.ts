import {TarefasComponent} from "./tarefas/tarefas.component";

/**
 * Arquivo de rotas a ser exportado ao 'app.module.ts'.
 *
 * As rotas que carregam diretamente o componente 'component: TarefasComponent' são carregadas de forma síncrona
 * enquanto as rotas que carregam por loadChildren 'loadChildren: './detalhes-tarefa#DetalhesTarefaModule'' são
 * carregadas de forma assíncrona pela aplicação, não necessitando a declaração do módulo em questão em quaisquer
 * outros módulos.
 */
export const ROUTES = [
  {path: '', component: TarefasComponent},
  {path: '**', component: TarefasComponent}
  // Exemplo de rota assíncrona (Não implementada neste exemplo):
  // {path: 'detalhes-tarefa', loadChildren: './detalhes-tarefa#DetalhesTarefaModule'},
];
