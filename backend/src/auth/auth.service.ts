import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(user: { id: number; username: string }) {
    return this.jwtService.sign({ id: user.id, username: user.username });
  }

  async registerUser(username: string, password: string) {
    // Verifica se o usuário já existe
    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      throw new UnauthorizedException('Username is already taken');
    }

    // Criptografa a senha
    const hashedPassword = await this.hashPassword(password);

    // Cria e salva o novo usuário no banco de dados
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.blocked) {
      throw new UnauthorizedException(
        'User is blocked due to multiple failed login attempts',
      );
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      user.attempt += 1;

      if (user.attempt >= 10) {
        user.blocked = true;
        user.active = false;
      }

      await this.userRepository.save(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset attempts on successful login
    user.attempt = 0;
    await this.userRepository.save(user);

    return user;
  }

  async unblockUser(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.blocked = false;
    user.active = true;
    user.attempt = 0;

    await this.userRepository.save(user);

    return { message: 'User has been unblocked successfully' };
  }
}
