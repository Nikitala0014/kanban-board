import { Controller, Get, Post, Put, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from '../schemas/board.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { UserDto } from '../auth/dto/user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getCards(@Request() req: any): Promise<Board[]> {
        const user = <UserDto>req.user
        return this.boardService.getCards(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addCard(@Body() createCardDto: CreateCardDto, @Request() req: any): Promise<Board> {
        const user = <UserDto>req.user
        return this.boardService.addCard(user, createCardDto)
    }

    @Put('update/:id/:name')
    updateCard(@Param('id') id: string, @Param('name') name: string): Promise<Board> {
        return this.boardService.updateCard({id: id, name: name})
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteCard(@Param('id') id: string): Promise<Board> {
        return this.boardService.removeCard(id)
    }
}
