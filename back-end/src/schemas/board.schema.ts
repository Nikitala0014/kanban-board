import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
    @Prop()
    userId: string

    @Prop()
    id: string;

    @Prop()
    name: string;
}
export const BoardSchema =  SchemaFactory.createForClass(Board)
