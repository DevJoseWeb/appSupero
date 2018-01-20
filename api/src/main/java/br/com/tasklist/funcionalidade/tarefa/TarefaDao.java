package br.com.tasklist.funcionalidade.tarefa;

import br.com.tasklist.core.dao.CrudDao;

import javax.enterprise.context.RequestScoped;
//tasklist - 19/01/2018 - SUPERO
@RequestScoped
public class TarefaDao extends CrudDao<Tarefa, Long> {

    @Override
    public String adicionaWhereBuscarTodos() {
        return "WHERE e.excluido = false ";
    }
}
