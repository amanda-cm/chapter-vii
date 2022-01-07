class Requests {
    
    getPing(){
        return cy.request({ //retorna um response com as propriedades(body, status, headers)
            method: 'GET',
            url: 'ping'
        })
    }

    getBooking(){
        return cy.request({ //requisição da api
            method: 'GET',
            url: 'booking/11'
        })
    }

    postBooking(){
        return cy.request({
            method: 'POST',
            url: '/booking',
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response){
        const id = response.body.bookingid //guarda o bookingid em id

        return cy.request({  //requisição para alterar a reserva 
            method: 'PUT',
            url: `booking/${id}`,  //id que retornou do novo cadastro
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false  //para o request não falhar independete do status code (ele falhava se não fosse 2xx ou 3xxx)
        })
    } 

    updateBookingWithTokenInvalid(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: 'tokeninvalido'
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    updateBooking(response){
        const id = response.body.bookingid //guarda o bookingid em id

        return cy.request({  //requisição para alterar a reserva 
            method: 'PUT',
            url: `booking/${id}`,  //id que retornou do novo cadastro
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false 
        })
    } 

    postAuth(){
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
    }

    doAuth(){ //gerar token
        this.postAuth().then(authResponse => {
            const token= authResponse.body.token //é o token que retorna ao autenticar

            Cypress.env('token', token)
        })
    }

    deleteBooking(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        }
    )}

    deleteBookingWithoutToken(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            failOnStatusCode: false
        }
    )}

    deleteBookingWithTokenInvalid(response){
        const id =  response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: '66dd485209bfa55'
            },
            failOnStatusCode: false
        })
    }
}

export default new Requests();