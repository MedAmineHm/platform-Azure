import { Test, TestingModule } from '@nestjs/testing';
import { TerraformController } from './terraform.controller';
import { TerraformService } from './terraform.service';
import { HttpException } from '@nestjs/common';

// Mock TerraformService
const mockTerraformService = {
  generateTerraformCode: jest.fn(),
  terraformCodeCost: jest.fn(),
};

describe('TerraformController', () => {
  let controller: TerraformController;
  let service: TerraformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerraformController],
      providers: [
        { provide: TerraformService, useValue: mockTerraformService },
      ],
    }).compile();

    controller = module.get<TerraformController>(TerraformController);
    service = module.get<TerraformService>(TerraformService);
  });

  // Suppression temporaire des sorties console
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('generateTerraformCode', () => {
    it('should return a successful response with generated terraform code', async () => {
      const data = JSON.stringify({ key: 'value' });
      const terraformCode = 'terraform code';
      (
        mockTerraformService.generateTerraformCode as jest.Mock
      ).mockResolvedValue(terraformCode);

      const result = await controller.generateTerraformCode(data);
      expect(result).toEqual({ success: true, data: terraformCode });
    });

    it('should throw an HttpException on error', async () => {
      const data = JSON.stringify({ key: 'value' });
      const errorMessage = 'Error';
      (
        mockTerraformService.generateTerraformCode as jest.Mock
      ).mockRejectedValue(new Error(errorMessage));
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(controller.generateTerraformCode(data)).rejects.toThrow(
        new HttpException('An error has occured.', 422),
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.objectContaining({ message: errorMessage }),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('terraformInfrastuctureCost', () => {
    it('should return a successful response with terraform cost', async () => {
      const data = JSON.stringify({ key: 'value' });
      const terraformCost = { cost: 100 };
      (mockTerraformService.terraformCodeCost as jest.Mock).mockResolvedValue(
        terraformCost,
      );

      const result = await controller.terraformInfrastuctureCost(data);
      expect(result).toEqual({ success: true, data: terraformCost });
    });

    it('should throw an HttpException on error', async () => {
      const data = JSON.stringify({ key: 'value' });
      const errorMessage = 'Error';
      (mockTerraformService.terraformCodeCost as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(controller.terraformInfrastuctureCost(data)).rejects.toThrow(
        new HttpException('An error has occured', 422),
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.objectContaining({ message: errorMessage }),
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
