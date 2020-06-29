const mongoose = require('mongoose');
const User = require('../model/User');
const request = require('supertest')
const app = require('../app');
const userData = { email: 'kalys100@gmail.com', username: 'kalys100', password: 'kalys100', confirmPassword: 'kalys100' };



describe('User Model Test', () => {

    beforeAll( async () => {
        await mongoose.connect('mongodb://localhost:27017/adepsTest', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });
    
    afterAll( async () => {
        await User.deleteMany()
        await mongoose.connection.close()
    })
    
    it('success register', async done => {
        try {
            const savedUser = await request(app).post('/register').send(userData)
            expect(savedUser.body).toHaveProperty('access_token', expect.any(String))
            expect(savedUser.body).toHaveProperty('username', expect.any(String))
            expect(savedUser.status).toBe(201);
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because email already exists', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, username: 'kalys101'})
            expect(savedUser.body.error).toContain('email already exists')
            expect(savedUser.status).toBe(400);
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because username already exists', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, email:'kalys101@mail.com'})
            expect(savedUser.body.error).toContain('username already exists')
            expect(savedUser.status).toBe(400);
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because password length less than 8', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, password:'kalys', confirmPassword: 'kalys'})
            expect(savedUser.body.error).toContain('password length min have 8 characters')
            expect(savedUser.status).toBe(400)
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because username is empty', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, username:''})
            expect(savedUser.body.error).toContain('field must not be empty')
            expect(savedUser.status).toBe(400)
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because email is empty', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, email:''})
            expect(savedUser.body.error).toContain('field must not be empty')
            expect(savedUser.status).toBe(400)
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because password is empty', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, password: '', confirmPassword: ''})
            expect(savedUser.body.error).toContain('field must not be empty')
            expect(savedUser.status).toBe(400);
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because invalid email type', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, email: 'asdad'})
            expect(savedUser.body.error).toContain('please enter valid email')
            expect(savedUser.status).toBe(400);
            done()
        } catch (error) {
            done(error)
        }
    })

    it('register failed because password and confirmPassword not match', async done => {
        try {
            const savedUser = await request(app).post('/register').send({...userData, password: 'asdasda', confirmPassword: 'uwhdwudqwh'})
            expect(savedUser.body.error).toContain('password not match')
            expect(savedUser.status).toBe(400);
            done()
        } catch (error) {
            done(error)
        }
    })

    it('success login', async done => {
        try {
            const validUser = await request(app).post('/login').send(userData)
            expect(validUser.body).toHaveProperty('access_token', expect.any(String))
            expect(validUser.body).toHaveProperty('username', expect.any(String))
            expect(validUser.status).toBe(200)
            done()
        } catch (error) {
            done(error)
        }    
    })
    
    it('login failed because password not match', async done => {
        try {
            const validUser = await request(app).post('/login').send({username: userData.username, password: 'salahin'})
            expect(validUser.body.error).toContain('password not match')
            expect(validUser.status).toBe(400)
            done()
        } catch (error) {
            done(error)
        }
    })

    it('login failed because username/email does not exists not match', async done => {
        try {
            const validUser = await request(app).post('/login').send({username: 'asoudaisdnas', password: 'kalys100'})
            expect(validUser.body.error).toContain('user does\'nt exit')
            expect(validUser.status).toBe(400)
            done()
        } catch (error) {
            done(error)
        }
    })
})