// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthGuard } from '@nestjs/passport';
import { BoardDTO } from 'src/user/dtos/board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  // @UseGuards(AuthGuard('jwt'))
  async getAllBoard(@Req() req) {
    try {
      const userId = req.user._id;
      const userBoards = await this.boardService.getAllUserboards(userId);
      return { success: true, data: userBoards };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }

  @Get('/:id')
  // @UseGuards(AuthGuard('jwt'))
  async getABoard(@Req() req, @Param('id') id: string) {
    try {
      const userId = req.user._id;
      const board = await this.boardService.getAuserBoard(id, userId);
      return { success: true, data: board };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }

  @Post('/')
  // @UseGuards(AuthGuard('jwt'))
  async createNewBoard(@Body() boardDTO: BoardDTO, @Req() req) {
    try {
      const payload = { ...boardDTO, user: req.user._id };
      const board = await this.boardService.createNewBoard(payload);
      return { success: true, data: board };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }

  @Put('/:id')
  // @UseGuards(AuthGuard('jwt'))
  async updateABoard(
    @Req() req,
    @Body() boardDTO: BoardDTO,
    @Param('id') id: string,
  ) {
    try {
      const userId = req.user._id;
      const updatedFields = {};
      if (boardDTO.title) updatedFields.title = boardDTO.title;
      if (boardDTO.description)
        updatedFields.description = boardDTO.description;
      if (boardDTO.board) updatedFields.board = boardDTO.board;
      const updatedBoard = await this.boardService.updateBoard(
        id,
        userId,
        updatedFields,
      );
      return { success: true, data: updatedBoard };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }

  @Delete('/:id')
  // @UseGuards(AuthGuard('jwt'))
  async deleteAboard(@Req() req, @Param('id') id: string) {
    try {
      const board = await this.boardService.deleteBoard(id, req.user._id);
      if (!board) throw new Error('board not found');
      return { success: true, data: board };
    } catch (e) {
      console.error(e);
      throw new HttpException('An error has occured', 422);
    }
  }
}
