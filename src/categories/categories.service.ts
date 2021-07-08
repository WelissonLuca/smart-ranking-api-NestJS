import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import { Category } from './interface/Category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategories(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const { category } = createCategoryDTO;

    await this.checkIfCategoryExists(category);

    const categoryToCreate = new this.categoryModel(createCategoryDTO);

    return await categoryToCreate.save();
  }

  async listCategories(): Promise<Category[]> {
    return this.categoryModel.find().populate('players').exec();
  }
  async listById(id: string): Promise<Category> {
    await this.checkIfCategoryDoesNotExist(id);

    return await this.categoryModel.findOne({ _id: id }).exec();
  }

  async updateCategories(
    id: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<void> {
    await this.checkIfCategoryDoesNotExist(id);

    await this.categoryModel
      .updateOne({ id }, { $set: { updateCategoryDTO } })
      .exec();
  }

  async AssignPlayerToCategory(params: string[]): Promise<void> {
    const category = params['category'];
    const player = params['player'];

    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    if (!foundCategory) throw new BadRequestException('Category not found');

    foundCategory.players.push(player);
    await this.categoryModel
      .updateOne({ category }, { $set: foundCategory })
      .exec();
  }
  private async checkIfCategoryDoesNotExist(id: string): Promise<Category> {
    const result = await this.categoryModel.findOne({ _id: id }).exec();
    if (!result) throw new BadRequestException('Category not found');
    return result;
  }
  private async checkIfCategoryExists(category: string): Promise<Category> {
    const result = await this.categoryModel.findOne({ category }).exec();
    if (result) throw new BadRequestException('Category already exists');

    return result;
  }
}
