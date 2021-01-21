import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @Prop()
    idRoot: string

    @Prop()
    id: string;

    @Prop()
    task: string

    @Prop()
    weight: number
}
export const CardSchema = SchemaFactory.createForClass(Card)
