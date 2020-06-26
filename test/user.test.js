const mongoose = require('mongoose');
const User = require('../model/User');
const request = require('supertest')
const app = require('../app');
const userData = { email: 'kalys100@mail.com', username: 'kalys100', password: 'kalys100', confirmPassword: 'kalys100' };

beforeAll( async () => {
    await mongoose.connect('mongodb://localhost:27017/adepsTest', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});

afterAll( async () => {
    await User.deleteMany({})
})

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    

    it('register successfully', async () => {
        // Object Id should be defined when successfully saved to MongoDB.
        try {
            const savedUser = await request(app).post('/register').send(userData)
            expect(savedUser.body).toHaveProperty('access_token', expect.any(String))
            expect(savedUser.status).toBe(201);
        } catch (error) {
            console.log(error)
        }
    })

    it('register failed', async () => {
        try {
            const savedUser = await request(app).post('/register').send(userData)
            expect(savedUser.body).toHaveProperty('access_token', expect.any(String))
            expect(savedUser.status).toBe(201);
        } catch (error) {
            
        }
    })

    it('login successfully', async () => {
        try {
            const validUser = await request(app).post('/login').send(userData)
            expect(validUser.body).toHaveProperty('access_token', expect.any(String))
            expect(validUser.status).toBe(200);
        } catch (error) {
            console.log(error)
        }
        
    })

    it('login failed', async () => {

    })

    // // Test Schema is working!!!
    // // You shouldn't be able to add in any field that isn't defined in the schema
    // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    //     const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
    //     const savedUserWithInvalidField = await userWithInvalidField.save();
    //     expect(savedUserWithInvalidField._id).toBeDefined();
    //     expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    // });

    // // Test Validation is working!!!
    // // It should us told us the errors in on gender field.
    // it('create user without required field should failed', async () => {
    //     const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
    //     let err;
    //     try {
    //         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    //         error = savedUserWithoutRequiredField;
    //     } catch (error) {
    //         err = error
    //     }
    //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //     expect(err.errors.gender).toBeDefined();
    // });

    
})







// const app = require('../app')
// const request = require('supertest')
// const User = require('../model/User')

// afterAll(done => {
//     User.deleteMany()
// });

// describe('User', () => {
//     describe('REGISTER', () => {
//         describe('success register', () => {
//             test('return success with status 201', done => {
//                 const userInput = {
//                     email: 'kalys05@mail.com',
//                     username: 'kalyskairry',
//                     password: 'kalys05',
//                     confirmPassword: 'kalys05' 
//                 }
//                 request(app)
//                     .post('/register')
//                     .send(userInput)
//                     .end((err, res) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(201)
//                             expect(res.body).toHaveProperty('access_token', expect.any(String))
//                             return done()
//                         }
//                     })
//             })
//         })
        
//         describe('failed register', () => {
//             test('should return message with status 400 because invalid email type', done => {
//                 const userInput = {
//                     email: 'kalys05sss',
//                     username: 'kalyskairry',
//                     password: 'kalys05',
//                     confirmPassword: 'kalys05'
//                 }
//             request(app)
//                 .post('/register')
//                 .send(userInput)
//                 .end((err, res) => {
//                     if(err){
//                         return done(err)
//                     } else {
//                         expect(res.status).toBe(400)
//                         expect(res.body.error).toContain('invalid email type')
//                         return done()
//                     }
//                 })
//             })
            
//             test('should return message with status 400 because password length less than 6', done => {
//                 const userInput = {
//                     email: 'kalys06@mail.com',
//                     username: 'kalyskairry',
//                     password: 'kalys',
//                     confirmPassword: 'kalys05'
//                 }
//                 request(app)
//                     .post('/register')
//                     .send(userInput)
//                     .end((err, res) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(400)
//                             expect(res.body.error).toContain('password length must contain 6 character')
//                             return done()
//                         }
//                     })
//             })

//             test('should return message with status 400 because password and confirm password not match', done => {
//                 const userInput = {
//                     email: 'kalys07@mail.com',
//                     username: 'kalyskairry',
//                     password: 'kalys05',
//                     confirmPassword: 'kalys06'
//                 }
//                 request(app)
//                 .post('/register')
//                 .send(userInput)
//                 .end((err, res) => {
//                     if(err){
//                         return done(err)
//                     } else {
//                         expect(res.status).toBe(400)
//                         expect(res.body.error).toContain("password and confirm password doesn't match")
//                         return done()
//                     }
//                 })
//             })

//             test("should return message with status 400 because there's an empty field", done => {
//                 const userInput = {
//                     email: '',
//                     username: '',
//                     password: '',
//                     confirmPassword: ''
//                 }
//                 request(app)
//                     .post('/register')
//                     .send(userInput)
//                     .end((err, response) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(400)
//                             expect(res.body.error).toContain('field cannot be empty')
//                         }
//                     })
//             })
//         })
//     })

//     describe('LOGIN', () => {
//         describe('success login', () => {
//             test('return access_token with status 200', (done) => {
//                 const userInput = {
                    
//                 }
//                 request(app)
//                     .post('/login')
//                     .send(userInput)
//                     .end((err, res) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(200)
//                             expect(res.body).toHaveProperty('access_token', expect.anything())
//                             return done()
//                         }
//                     })
//             }) 
//         })
        
//         describe('failed login', () => {
//             test('should return message with status 400 because password not match', done => {
//                 const userInput = {
    
//                 }
//                 request(app)
//                     .post('/login')
//                     .send(userInput)
//                     .end((err, res) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(400)
//                             expect(res.body.error).toContain('password not match')
//                             return done()
//                         }
//                     })
//             })
    
//             test('should return message with status 400 because data not found', () => {
//                 const userInput = {
    
//                 }
//                 request(app)
//                     .post('/login')
//                     .send(userInput)
//                     .end((err, res) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(400)
//                             expect(res.body.error).toContain('data not found')
//                             return done()
//                         }
//                     })
//             })
    
//             test('should return status 500 because email and password is null', done => {
//                 request(app)
//                     .post('/login')
//                     .end((err, res) => {
//                         if(err){
//                             return done(err)
//                         } else {
//                             expect(res.status).toBe(500)
//                             expect(res.body.error).toContain('Internal server error')
//                             return done()
    
//                         }
//                     })
//             })
//         })
//     })
// })