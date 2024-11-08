import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import fse from 'fs-extra';
import * as path from 'path';
import { TerraformService } from './terraform.service';
import { executeCommand } from 'src/utils';

// Mock the functions interacting with the filesystem and command execution
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('fs-extra', () => ({
  outputFileSync: jest.fn(),
  removeSync: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn().mockReturnValue('/mocked/path/to/template.tf.hbs'),
}));

jest.mock('src/utils', () => ({
  executeCommand: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid'),
}));

describe('TerraformService', () => {
  let service: TerraformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerraformService],
    }).compile();

    service = module.get<TerraformService>(TerraformService);
  });
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks(); // Make sure to restore mocks to their original implementation
  });
  describe('readFile', () => {
    it('should return file content when file is read successfully', async () => {
      const fileContent = 'mock file content';
      (fs.readFile as unknown as jest.Mock).mockImplementation(
        (
          filePath: string,
          encoding: string,
          callback: (err: Error | null, data: string) => void,
        ) => {
          callback(null, fileContent);
        },
      );

      const result = await service.readFile('/mocked/path/to/file');
      expect(result).toBe(fileContent);
    });

    it('should throw an error when file reading fails', async () => {
      const errorMessage = 'Error reading file';
      (fs.readFile as unknown as jest.Mock).mockImplementation(
        (
          filePath: string,
          encoding: string,
          callback: (err: Error | null, data: string | null) => void,
        ) => {
          callback(new Error(errorMessage), null);
        },
      );

      await expect(service.readFile('/mocked/path/to/file')).rejects.toThrow(
        `Error reading file: ${errorMessage}`,
      );
    });
  });

  describe('generateTerraformCode', () => {
    it('should generate terraform code using Handlebars template', async () => {
      const templateContent = 'resource "azure_instance" "{{key}}" {}';
      const data = { key: 'my-instance' };
      (fs.readFile as unknown as jest.Mock).mockImplementation(
        (
          filePath: string,
          encoding: string,
          callback: (err: Error | null, data: string) => void,
        ) => {
          callback(null, templateContent);
        },
      );

      const result = await service.generateTerraformCode(data);
      expect(result).toBe('resource "azure_instance" "my-instance" {}');
    });
  });

  describe('terraformCodeCost', () => {
    it('should generate terraform code, write to a file, and calculate cost', async () => {
      const generatedCode = 'resource "azure_instance" "my-instance" {}';
      const costOutput = 'Estimated cost: $100';
      const mockUuid = 'mock-uuid';

      jest
        .spyOn(service, 'generateTerraformCode')
        .mockResolvedValue(generatedCode);
      (fs.readFileSync as jest.Mock).mockReturnValue(costOutput);
      jest.spyOn(fse, 'outputFileSync').mockImplementation(() => {});
      jest.spyOn(fse, 'removeSync').mockImplementation(() => {});

      // Mock path.join to return expected paths
      jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));

      const result = await service.terraformCodeCost({ key: 'my-instance' });

      expect(service.generateTerraformCode).toHaveBeenCalledWith({
        key: 'my-instance',
      });
      expect(fse.outputFileSync).toHaveBeenCalledWith(
        `./terraform-codes/${mockUuid}/main.tf`,
        generatedCode,
      );
      expect(executeCommand).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledWith(
        `./terraform-codes/${mockUuid}/output.txt`,
        'utf-8',
      );
      expect(fse.removeSync).toHaveBeenCalledWith(
        `./terraform-codes/${mockUuid}`,
      );
      expect(result).toBe(costOutput);
    });

    it('should return null if reading cost output file fails', async () => {
      jest
        .spyOn(service, 'generateTerraformCode')
        .mockResolvedValue('generated code');
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File read error');
      });

      const result = await service.terraformCodeCost({ key: 'my-instance' });

      expect(result).toBeNull();
    });
  });
});
