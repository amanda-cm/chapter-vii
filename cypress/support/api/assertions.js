class Assertions {

    shouldHaveStatus(response,status){  //método para validar o status
        expect(response.status, 'status is').to.eq(status)
    }
    
    shouldBookingIdNotNull(response){
        expect(response.body.bookingid, 'booking exist').to.not.be.null //bookingid não pode ser nulo
    }

    shouldHaveDefaultHeaders(response){
        expect(response.headers, 'default headers includes').to.include({ //deve conter no header (conteudo que não muda)
            server: 'Cowboy',        //sempre com letras minusculas
            connection: 'keep-alive',
            'x-powered-by': 'Express'       //x powered by ficou com '' pq não é uma unica palavra
        })
    }

    shouldHaveContentType(response){
        expect(response.headers, 'content type include').to.include({ //conteudo que podem mudar
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDuractionBeFast(response){
        expect(response.duration, 'response duration').lessThan(900)  //tempo de resposta menor que 900 milisegundos
    }
}

export default new Assertions();