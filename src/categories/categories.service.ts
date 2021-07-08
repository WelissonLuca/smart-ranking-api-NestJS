import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateAggregationStage } from 'mongoose';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import { Category } from './interface/Category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('categories') private readonly categoryModel: Model<Category>,
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
    return this.categoryModel.find().exec();
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
