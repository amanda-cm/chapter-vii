/// <reference types="cypress" />

import req from '../support/api/requests'
import assert from '../support/api/assertions'


describe('Ping', () => {
    it('Verificar se a aplicação está no ar @healthcheck', () => {
        //req.getPing().its('status').should('eq', 201) //its seleciona qual propriedade do response seja passada
         req.getPing().then(getPingResponse => { //guarda o valor do ping em getPingResponse
             assert.shouldHaveStatus(getPingResponse, 201) //verifica se o valor do getPingResponse é 201
         })   
    });
});