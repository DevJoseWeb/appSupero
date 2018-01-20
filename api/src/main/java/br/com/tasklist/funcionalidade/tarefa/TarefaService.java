package br.com.tasklist.funcionalidade.tarefa;

import br.com.tasklist.core.dao.CrudDao;
import br.com.tasklist.core.service.CrudService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.time.LocalDate;

/**
*
* @author Jose RJ Junior 
* Supero TI - 19/01/2018
* 
*/

@Stateless
public class TarefaService extends CrudService<Tarefa, Long> {

    @Inject
    private TarefaDao dao;

    @Override
    protected CrudDao<Tarefa, Long> getDao() {
        return dao;
    }

    @Override
    public Tarefa inserir(Tarefa entity) {
        entity.setDataCriacao(LocalDate.now());
        return super.inserir(entity);
    }

    @Override
    public Tarefa atualizar(Tarefa entity) {
        entity.setDataUltimaEdicao(LocalDate.now());
        return super.atualizar(entity);
    }

    @Override
    public void remover(Long id) {
        Tarefa tarefa = buscarPorId(id);
        tarefa.setExcluido(true);
        tarefa.setDataRemocao(LocalDate.now());
    }

    public void marcarTarefaComoConcluida(Long idTarefa) {
        Tarefa tarefa = buscarPorId(idTarefa);
        tarefa.setConcluida(true);
        tarefa.setDataConclusao(LocalDate.now());
    }

    public void marcarTarefaComoNaoConcluida(Long idTarefa) {
        Tarefa tarefa = buscarPorId(idTarefa);
        tarefa.setConcluida(false);
        tarefa.setDataConclusao(null);
    }
}
