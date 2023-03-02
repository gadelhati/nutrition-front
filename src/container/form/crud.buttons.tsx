import { useState } from 'react';
import { crudInterface } from '../../component/crud.interface';
import { create, retrieve, retrieveAll, update, remove, removeAll } from '../../service/crud.service';

export const Crud = (crud: crudInterface) => {
    const [state, setState] = useState<Object>(crud.initialObject)

    const resetItem = () => {
        setState(crud.initialObject)
    }
    const createItem = () => {
        create(crud.url, crud.object)
        // resetItem()
        // if(itens == null) resetItem()
    }
    const retrieveItem = () => {
        retrieve(crud.url, crud.object.id)
        // resetItem()
    }
    const retrieveAllItem = () => {
        retrieveAll(crud.url, crud.object.name)
        // resetItem()
    }
    const updateItem = () => {
        update(crud.url, crud.object)
        // if(itens == null) resetItem()
    }
    const deleteItem = () => {
        remove(crud.url, crud.object.id)
        // resetItem()
    }
    const deleteAllItem = () => {
        removeAll(crud.url)
        // resetItem()
    }
    const access = (): boolean => {
        let allowed: boolean = false
        // crud.error?.map( element => { if("403" == element.field) return allowed = true })
        return allowed
    }
    const executed = (): boolean => {
        let executed: boolean = false
        // crud.error?.map( element => { if("" == element.field) return executed = true })
        return executed
    }
    return (
        <>
            {/* <button color="secondary" onClick={retrieveAllItem} hidden={executed()}>Resetar</button> */}
            {/* <button color="secondary" onClick={createItem} hidden={crud.object.id != "" || executed()} data-bs-toggle="modal">Criar</button> */}
            {/* <button color="warning" onClick={updateItem} hidden={crud.object.id == "" || executed()} data-bs-toggle="modal">Atualizar</button> */}
            {/* <button color="danger" onClick={deleteItem} hidden={crud.object.id == "" || executed()} data-bs-toggle="modal">Deletar</button> */}
            {/* <button color="secondary" onClick={retrieveAllItem} data-bs-dismiss="modal">Fechar</button> */}
            {executed() && <button disabled={true}>Executado</button>}
            {access() && <button disabled>Acesso negado</button>}

            <button color="secondary" onClick={retrieveAllItem} >Resetar</button>
            <button color="secondary" onClick={createItem} data-bs-toggle="modal">Criar</button>
            <button color="secondary" onClick={retrieveItem} data-bs-toggle="modal">Buscar</button>
            <button color="secondary" onClick={retrieveAllItem} data-bs-toggle="modal">Buscar Todos</button>
            <button color="warning" onClick={updateItem} data-bs-toggle="modal">Atualizar</button>
            <button color="danger" onClick={deleteItem} data-bs-toggle="modal">Deletar</button>
            <button color="secondary" onClick={retrieveAllItem} data-bs-dismiss="modal">Fechar</button>
        </>
    );
}