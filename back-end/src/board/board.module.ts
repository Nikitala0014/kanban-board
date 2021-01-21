import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board, BoardSchema } from '../schemas/board.schema';
import { CardModule } from './card/card.module'
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [UserModule,
              AuthModule,
              CardModule, 
              MongooseModule.forFeature([{name: Board.name, schema: BoardSchema}])],
    controllers: [BoardController],
    providers: [BoardService]
})
export class BoardModule {}
