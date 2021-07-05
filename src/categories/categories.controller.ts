import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { Category } from './interface/Category.interface';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async createCategories(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoryService.createCategories(createCategoryDTO);
  }
}
