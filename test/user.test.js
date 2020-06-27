const mongoose = require('mongoose');
const User = require('../model/User');
const request = require('supertest')
const app = require('../app');
const userData = { email: 'kalys100@gmail.com', username: 'kalys100', password: 'kalys100', confirmPassword: 'kalys100' };

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
    
    it('register successfully', async () => {
        try {
            const savedUser = await request(app).post('/register').send(userData)
            expect(savedUser.body).toHaveProperty('access_token', expect.any(String))
            expect(savedUser.status).toBe(201);
        } catch (error) {
            console.log(error)
        }
    })

    it('register failed because email already exists', async () => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, username: 'kalys101'})
            expect(savedUser.body.error).toContain('email already exists')
            expect(savedUser.status).toBe(400);
        } catch (error) {
            console.log(error)
        }
    })

    it('register failed because username already exists', async () => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, email:'kalys101@mail.com'})
            expect(savedUser.body.error).toContain('username already exists')
            expect(savedUser.status).toBe(400);
        } catch (error) {
            console.log(error)
        }
    })

    it('register failed because password length less than 8', async () => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, password:'kalys', confirmPassword: 'kalys'})
            expect(savedUser.body.error).toContain('password length min have 8 characters')
            expect(savedUser.status).toBe(400);
        } catch (error) {
            console.log(error)
        }
    })

    it('register failed because one of the field is empty', async () => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, username:''})
            expect(savedUser.body.error).toContain('field must not be empty')
            expect(savedUser.status).toBe(400);
        } catch (error) {
            console.log(error)
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
    
    it('login failed because password not match', async () => {
        try {
            const validUser = await request(app).post('/login').send({username: userData.username, password: 'salahin'})
            expect(validUser.body.error).toContain('password not match')
            expect(validUser.status).toBe(400);
        } catch (error) {
            console.log(error)
        }
    })
})