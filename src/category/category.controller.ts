import { Controller, Get, Param, UsePipes, ValidationPipe, HttpCode, Post, Put, Delete, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @Get('by-storeId/:storeid')
  async getByStoreId(
    @Param('storeId') storeId: string, 
  ) {
    return this.categoryService.getByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(
    @Param('storeId') storeId: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(
    @Param('id') id: string
  ) {
    return this.categoryService.delete(id);
  }
}
