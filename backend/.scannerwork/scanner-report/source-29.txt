import { Injectable } from '@nestjs/common';
import handlebars from 'handlebars';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import fse from 'fs-extra';
import { executeCommand } from 'src/utils';

@Injectable()
export class TerraformService {
  async readFile(filePath: string): Promise<string> {
    const readFileAsync = promisify(fs.readFile);
    try {
      const fileContent = await readFileAsync(filePath, 'utf8');
      return fileContent;
    } catch (err) {
      throw new Error(`Error reading file: ${err.message}`);
    }
  }

  // ============= Generate Terraform Code =================
  async generateTerraformCode(data: any) {
    const filePath = path.join(
      process.cwd(),
      './terraform-template/template.tf.hbs',
    );
    const content = await this.readFile(filePath);
    const template = handlebars.compile(content);
    const output = template(data);

    return output;
  }

  // ============= Terraform Code Cost ====================
  async terraformCodeCost(data: any) {
    const output = await this.generateTerraformCode(data);

    // generate .tf file
    const folderName = uuidv4();
    const folderPath = `./terraform-codes/${folderName}`;
    const filePath = path.join(folderPath, 'main.tf');
    fse.outputFileSync(filePath, output);

    executeCommand(
      `cd ${folderPath} && infracost breakdown --path . --out-file output.txt && sed -i 's/\x1b\[[0-9;]*m//g' output.txt`,
    );

    try {
      const outputFilePath = `${folderPath}/output.txt`;

      // Read the file synchronously
      const fileOutput = fs.readFileSync(outputFilePath, 'utf-8');

      // delete the generated file
      fse.removeSync(folderPath);

      return fileOutput;
    } catch (err) {
      console.error('Error reading file:', err);
      return null;
    }
  }
}
