import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';
import AppError from '../errors/AppError';


interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401);
        }
        
        if (user.avatar) {
            //Deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
    
        user.avatar = avatarFilename;

        await usersRepository.save(user); // O salve vale tanto para salvar como para criar
    
        return user;
    
    }

}

export default UpdateUserAvatarService;