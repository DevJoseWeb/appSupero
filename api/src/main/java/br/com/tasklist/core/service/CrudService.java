package br.com.tasklist.core.service;

import br.com.tasklist.core.dao.CrudDao;
import br.com.tasklist.core.model.entity.BaseEntity;

import javax.inject.Inject;
import javax.validation.Validator;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

/**
 * Service com metodos genericos para CRUD. tasklist - 19/01/2018 - SUPERO
 */
public abstract class CrudService<E extends BaseEntity<ID>, ID extends Serializable> {

    @Inject
    protected Validator validator;

    private Class<E> classE;

    public E inserir(E entity) {
        getDao().inserir(entity);
        return entity;
    }

    public E atualizar(E entity) {
        getDao().atualizar(entity);
        return entity;
    }

    public void remover(ID id) {
        getDao().remover(id);
    }

    public E buscarPorId(ID id) {
        return getDao().buscarPorId(id);
    }

    public List<E> buscarTodos() {
        return getDao().buscarTodos();
    }

    protected abstract CrudDao<E, ID> getDao();

    @SuppressWarnings("unchecked")
    protected Class<E> getClassE() {
        if (classE == null) {
            this.classE = (Class<E>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        }
        return classE;
    }
}
