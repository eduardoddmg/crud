import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
  ) {}

  create(item: Partial<Item>) {
    return this.itemRepo.save(item);
  }

  createBatch(items: Partial<Item>[]) {
    return this.itemRepo.save(items);
  }

  findAll(q?: string) {
    if (!q || q.trim() === '') {
      // Retorna todos os itens se `q` não for fornecido ou estiver vazio
      return this.itemRepo.find();
    }

    // Realiza busca por nome ou descrição que contenham `q`
    return this.itemRepo.find({
      where: [{ name: Like(`%${q}%`) }, { description: Like(`%${q}%`) }],
    });
  }

  findById(id: number) {
    return this.itemRepo.findOneBy({ id });
  }

  update(id: number, item: Partial<Item>) {
    return this.itemRepo.update(id, item);
  }

  archive(id: number) {
    return this.itemRepo.update(id, { active: true });
  }

  remove(id: number) {
    return this.itemRepo.delete(id);
  }
}
