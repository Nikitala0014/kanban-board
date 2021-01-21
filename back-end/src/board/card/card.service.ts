import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from '../../schemas/card.schema';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class CardService {
    constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

    async addTask(createTaskDto: CreateTaskDto): Promise<Card> {
        const {idRoot} = createTaskDto
        const taskList = await this.cardModel.find({idRoot: idRoot})
        for(const task of taskList) {
            await this.cardModel.findOneAndUpdate({id: task.id}, {weight: task.weight + 1})
        }
        const createdTask = new this.cardModel(createTaskDto)
        return createdTask.save()
    }

    async getTasks(): Promise<Card[]> {
        return await this.cardModel.find().exec()
    }

    async removeTask(id: string): Promise<Card> {
        return await this.cardModel.findOneAndDelete({id: id})
    }

    async updateTask({id, task}): Promise<Card> {
        return await this.cardModel.findOneAndUpdate({id: id}, {task: task})
    }

    async dragnDrop({idTask, idCurrent, idRoot, idTaskRoot}): Promise<any> {
        const taskList_ = await this.cardModel.find({idRoot: idRoot})
        if(idCurrent !== 0) {
            const currentTask = await this.cardModel.findOne({id: idCurrent})
            let taskList = taskList_.filter(task => task.weight > currentTask.weight)

            if(taskList) {
                for(const task of taskList) {
                    await this.cardModel.findOneAndUpdate({id: task.id}, {weight: task.weight + 1})
                }
            }

            if (idRoot !== idTaskRoot) {
            
                return await this.cardModel.findOneAndUpdate({id: idTask}, {weight: currentTask.weight + 1, idRoot: idRoot})
            } else {
                return await this.cardModel.findOneAndUpdate({id: idTask}, {weight: currentTask.weight + 1})
            }
        } else {
            console.log('okey');
            
            return await this.cardModel.findOneAndUpdate({id: idTask}, {weight: 1, idRoot: idRoot})
        }
        
    }
}
