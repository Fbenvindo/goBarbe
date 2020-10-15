import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // para observar o conteúdo do token, ir no site jwt

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);
        
        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);          
        }

        // user.password - Senha criptografada
        // password - Senha não criptografada

        const passwordWatched = await compare(password, user.password);
        
        if (!passwordWatched) {
            throw new AppError('Incorrect email/password combination.', 401);          
        }             
    
        //Opção A - Short Sintax

        const { secret, expiresIn } = authConfig.jwt;
        
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn, 
        })   

        //Opção B
        
        // const token = sign({},  authConfig.jwt.secret, {
        //     subject: user.id,
        //     expiresIn: authConfig.jwt.expiresIn,
        // }) 
       
        return {
            user,
            token,
        }
    }
}

export default AuthenticateUserService;