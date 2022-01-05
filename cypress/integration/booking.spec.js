/// <reference types="cypress" />

import spok from 'cy-spok'
import req from '../support/api/requests'
import schema from '../support/api/schemas'
import assert from '../support/api/assertions'

context('Booking', () => {

    before(() => {  //gerar token para poder gerar uma nova reserva com o postBooking
        req.doAuth()
    });
    it('Validar o contrato do GET Booking', () => {
        req.getBooking().then(getBookingResponse => { //resposta(request) da requisição no getBookingResponse
            cy.wrap(getBookingResponse.body).should( //wrap pega a resposta do response, seleciona o conteudo do body e encapsula em um objeto
               schema.getBookingSchema()  //faz a asserção que está em schemas
            )
        })
    });

    it('Criar uma reserva com sucesso', () => {
       req.postBooking().then(postBookingResponse => {  //postBooking é a requisição (requests)
                                                       //postBookingResponse guarda a resta da requisição
            expect(postBookingResponse.status).to.eq(200)  //verifica se o status retorna 200
            assert.shouldBookingIdNotNull(postBookingResponse) //passa a resposta da requisição postBookingResponse
            assert.shouldHaveDefaultHeaders(postBookingResponse)
            assert.shouldHaveContentType(postBookingResponse)
            assert.shouldDuractionBeFast(postBookingResponse)
        })
    });

    it('Tentar editar uma reserva sem token', () => {

        req.postBooking().then(postBookingResponse => { //faz a requisição postBooking para criar uma reserva, guarda a reposta em postBookingResponse
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => { //edita uma reserva
              assert.shouldHaveStatus(putBookingResponse, 403) //verifica se o valor que retornou é 403
            })
        });        
    });

    it('Editar uma reserva com sucesso', () => {
        req.postBooking().then(postBookingResponse => { //faz a requisição postBooking para criar uma reserva, guarda a reposta em postBookingResponse
            req.updateBooking(postBookingResponse).then(putBookingResponse => { //edita uma reserva
              assert.shouldHaveStatus(putBookingResponse, 200) //verifica se o valor que retornou é 200
            })
        });     
    });

    it('Excluir uma reserva com sucesso', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assert.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })
    });

    it('Tentar excluir uma reseva sem token', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => { //request para deletar a reserva enviando o postBookingResponse, guarda a resposta do deleteBookingWithoutToken em deleteBookingResponse
                assert.shouldHaveStatus(deleteBookingResponse, 403)
            })
        }) 
    });
});