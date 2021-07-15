import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './session.model';
import { CreateSessionDTO } from './session.dto';
import { PagingOptions, FindResult } from '../commons';

@Injectable()
export class SessionRepo {

  constructor (@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

  async save(userId: string, payload: CreateSessionDTO): Promise<Session> {
    // Bypass typeschecking
    let session = new this.sessionModel({ ...payload, user: userId });
    await session.save();
    return session.toObject();
  }

  async remove(id: string) {
    const result = await this.sessionModel.findByIdAndDelete(id);
    return result;
  }

  async find(pagingOptions: PagingOptions) {
    const totalItems = await this.sessionModel.estimatedDocumentCount();
  }

  async findOne(id: string) {
    
  }
}