import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from '../../schemas/card.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskDragDto } from '../dto/task-drag.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

@Controller('tasks')
export class CardController {
    constructor(private cardService: CardService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getTasks(): Promise<Card[]> {
        return this.cardService.getTasks()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    addTasks(@Body() createTaskDto: CreateTaskDto): Promise<Card> {
        return this.cardService.addTask(createTaskDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    removeTask(@Param('id') id: string): Promise<Card> {
        return this.cardService.removeTask(id)
    }

    @Put('update/:id/:task')
    updateTask(@Param('id') id: string, @Param('task') task: string): Promise<Card> {
        return this.cardService.updateTask({id: id, task: task})
    }

    @Put('dragndrop')
    updateDragTask(@Body() taskDragDto: TaskDragDto) {
        console.log('task drag dto', taskDragDto);
        
        return this.cardService.dragnDrop(taskDragDto)
    }
}
