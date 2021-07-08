import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { CategorySchema } from './interface/Category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    PlayersModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoriesModule {}
