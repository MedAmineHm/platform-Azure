import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from 'src/schemas/Board.schema';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  async getAllUserboards(userId: string) {
    const boards = await this.boardModel.find({ user: userId });
    return boards;
  }

  async getAuserBoard(id: string, userId: string) {
    const board = await this.boardModel.findOne({ user: userId, _id: id });
    return board;
  }

  async createNewBoard(payload: any) {
    // @ts-expect-error: Unreachable code error

    const newBoard = this.boardModel(payload);
    await newBoard.save();
    return newBoard;
  }

  async updateBoard(boardId: string, userId: string, payload: any) {
    await this.boardModel.findOneAndUpdate(
      { user: userId, _id: boardId },
      payload,
    );

    return this.getAuserBoard(boardId, userId);
  }

  async deleteBoard(boardId: string, userId: string) {
    const board = await this.boardModel.findByIdAndDelete({
      user: userId,
      _id: boardId,
    });
    return board;
  }
}
