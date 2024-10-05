import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { TerraformService } from './terraform.service';

@Controller('terraform')
export class TerraformController {
  constructor(private readonly terraformService: TerraformService) {}

  // ==================== Generate Terraform Code ==================

  // POST: /terraform/generate
  @Post('generate')
  async generateTerraformCode(@Body('data') data: string) {
    try {
      const parsedData = JSON.parse(data);
      const terraformCode =
        await this.terraformService.generateTerraformCode(parsedData);
      return { success: true, data: terraformCode };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured.', 422);
    }
  }

  // COST: /terraform/cost
  @Post('cost')
  async terraformInfrastuctureCost(@Body('data') data: string) {
    try {
      const parsedData = JSON.parse(data);
      const terraformCost =
        await this.terraformService.terraformCodeCost(parsedData);
      return { success: true, data: terraformCost };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }
}
