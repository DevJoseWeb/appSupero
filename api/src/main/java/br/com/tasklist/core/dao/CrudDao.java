package br.com.tasklist.core.dao;

import br.com.tasklist.core.model.entity.BaseEntity;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

/**
 * Dao com metodos genericos para CRUD. tasklist - 19/01/2018 - SUPERO
 */
public abstract class CrudDao<E extends BaseEntity<ID>, ID extends Serializable> {

    @Produces
    @PersistenceContext
    protected EntityManager em;

    protected Class<E> classE;

    public E inserir(final E entity) {
        em.persist(entity);
        return entity;
    }

    public E atualizar(final E entity) {
        return em.merge(entity);
    }

    public void remover(final ID id) {
        E e = buscarPorId(id);
        em.remove(e);
    }

    public E buscarPorId(final ID id) {
        if (id == null) {
            return null;
        }

        StringBuilder jpql = new StringBuilder();
        jpql.append("SELECT e FROM ").append(getClassE().getName()).append(" e WHERE e.id = :id ");
        TypedQuery<E> query = em.createQuery(jpql.toString(), getClassE());
        query.setParameter("id", id);

        try {
            return query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<E> buscarTodos() {

        StringBuilder jpql = new StringBuilder();
        jpql.append("Select e From " + getClassE().getName() + " e ");
        jpql.append(adicionaWhereBuscarTodos());

        return em.createQuery(jpql.toString()).getResultList();
    }

    public String adicionaWhereBuscarTodos() {
        return "";
    }

    @SuppressWarnings("unchecked")
    public Class<E> getClassE() {
        if (classE == null) {
            classE = (Class<E>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        }
        return classE;
    }
}
