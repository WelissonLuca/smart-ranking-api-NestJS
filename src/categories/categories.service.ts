import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
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

    const categoryAlreadyExists = await this.categoryModel
      .findOne({ category })
      .exec();

    if (categoryAlreadyExists)
      throw new BadRequestException('Category already exists');

    const categoryToCreate = new this.categoryModel(createCategoryDTO);

    return await categoryToCreate.save();
  }

  async listCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  async listById(id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id: id }).exec();

    if (!category) throw new BadRequestException('Category not found');

    return category;
  }
}
