import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from '../schemas/board.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { UserDto } from '../auth/dto/user-dto';

@Injectable()
export class BoardService {
    constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) {}

    async addCard({ userId }: UserDto, createCardDto: CreateCardDto): Promise<Board> {
        const { id, name } = createCardDto

        const createdCard = new this.boardModel({ userId, id, name })
        return createdCard.save()
    }

    async getCards({ userId }: UserDto): Promise<Board[]> {
        return await this.boardModel.find({userId: userId}).exec()
    }

    async updateCard({id, name}): Promise<Board> {
        return await this.boardModel.findOneAndUpdate({id: id}, {name: name})
    }

    async removeCard(id: string): Promise<Board> {
        return await this.boardModel.findOneAndDelete({id: id})
    }
}
