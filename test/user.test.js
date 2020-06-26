const app = require('../app')
const request = require('supertest')

describe('User', () => {
    describe('LOGIN', () => {
        describe('success login', () => {
            test('return access_token with status 200', (done) => {
                const userInput = {
                    
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(res.status).toBe(200)
                            expect(res.body).toHaveProperty('access_token', expect.anything())
                            return done()
                        }
                    })
            }) 
        })
        
        describe('failed login', () => {
            test('should return message with status 400 because password not match', done => {
                const userInput = {
    
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body.error).toContain('password not match')
                            return done()
                        }
                    })
            })
    
            test('should return message with status 400 because data not found', () => {
                const userInput = {
    
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body.error).toContain('data not found')
                            return done()
                        }
                    })
            })
    
            // test('should return status 500 because email and password is null', done => {
            //     request(app)
            //         .post('/login')
            //         .end((err, res) => {
            //             if(err){
            //                 return done(err)
            //             } else {
            //                 expect(res.status).toBe(500)
            //                 expect(res.body.error).toContain('Internal server error')
            //                 return done()
    
            //             }
            //         })
            // })
        })
    })

    describe('REGISTER', () => {
        describe('success register', () => {
            test('return success with status 201', done => {
                const userInput = {

                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('access_token', expect.any(String))
                            return done()
                        }
                    })
            })
        })
        
        describe('failed register', () => {
            test('should return message with status 400 because invalid email type', done => {
                const userInput = {

                }
            request(app)
                .post('/register')
                .send(userInput)
                .end((err, res) => {
                    if(err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body.error).toContain('invalid email type')
                        return done()
                    }
                })
            })
            
            test('should return message with status 400 because password length less than 6', done => {
                const userInput = {
                    
                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body.error).toContain('password length must contain 6 character')
                            return done()
                        }
                    })
            })

            test('should return message with status 400 because password and confirm password not match', done => {
                const userInput = {

                }
                request(app)
                .post('/register')
                .send(userInput)
                .end((err, res) => {
                    if(err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body.error).toContain("password and confirm password doesn't match")
                        return done()
                    }
                })
            })

            test("should return message with status 400 because there's an empty field", done => {
                const userInput = {

                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(res.status).toBe(400)
                            expect(res.body.error).toContain('field cannot be empty')
                        }
                    })
            })
        })
    })
})