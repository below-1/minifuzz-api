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
    
  }

  async findForUser(id: string, pagingOptions: PagingOptions) {
    const { page, perPage } = pagingOptions;
    const totalItems = await this.sessionModel.estimatedDocumentCount();
    const skip = page * perPage;
    const totalPage = Math.ceil(totalItems / perPage);
    const items = await this.sessionModel
      .find({ user: Types.ObjectId(id) })
      .limit(perPage)
      .skip(skip);
    return {
      totalItems,
      totalPage,
      page,
      perPage,
      items
    }
  }

  async findOne(id: string) {
    const session = await this.sessionModel.findById(id);
    return session;
  }
}