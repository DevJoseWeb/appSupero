package br.com.tasklist.core.endpoint;

import br.com.tasklist.core.model.entity.BaseEntity;
import br.com.tasklist.core.service.CrudService;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.Serializable;

/**
 * Endpoint com metodos genericos para CRUD.//tasklist - 19/01/2018 - SUPERO
 */
public abstract class CrudEndpoint<E extends BaseEntity<ID>, ID extends Serializable, S extends CrudService<E, ID>> extends Endpoint {

    @Inject
    protected Instance<S> service;

    @GET
    @Path("/{id}")
    public Response buscaPorId(@PathParam("id") final ID id) {
        E entity = service.get().buscarPorId(id);
        if (entity != null) {
            return ok(entity);
        }
        return notFound();
    }

    @GET
    public Response buscarTodos() {
        return ok(service.get().buscarTodos());
    }

    @POST
    public Response inserir(@Valid E entity) {
        return ok(service.get().inserir(entity));
    }

    @PUT
    public Response atualizar(@Valid E entity) {
        service.get().atualizar(entity);
        return ok();
    }

    @DELETE
    @Path("/{id}")
    public Response remover(@PathParam("id") final ID id) {
        service.get().remover(id);
        return ok();
    }
}
