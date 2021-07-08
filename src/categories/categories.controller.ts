import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDTO } from './dtos/CreateCategory.dto';
import { UpdateCategoryDTO } from './dtos/UpdateCategory.dto';
import { Category } from './interface/Category.interface';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createCategories(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoryService.createCategories(createCategoryDTO);
  }

  @Get()
  async listCategories(): Promise<Category[]> {
    return await this.categoryService.listCategories();
  }

  @Get('/:id')
  async findByCategoryId(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.listById(id);
  }

  @Put('/:id')
  async updateCategories(
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('id') id: string,
  ): Promise<void> {
    await this.categoryService.updateCategories(id, updateCategoryDTO);
  }
}
