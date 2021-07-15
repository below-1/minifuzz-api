import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { PagingOptions,FindResult } from '../commons';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

class UserNotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'UserNotFoundError';
  }
}

@Injectable()
export class UserRepo {
  constructor (@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(keyword: string, paging: PagingOptions) {
    const regex = new RegExp(`/^.*${keyword}.*/`);
    const queryObject = { name: regex }
    const totalItems = await this.userModel.countDocuments(queryObject)
    let result: FindResult<User> = {
      perPage: -1,
      page: -1,
      totalItems,
      totalPage: -1,
      items: []
    }
    let query = this.userModel.find(queryObject)
    const skip = paging.perPage * paging.page;
    query = query.skip(skip).limit(paging.perPage);
    result.perPage = paging.perPage;
    result.page = paging.page;
    result.totalPage = Math.ceil(totalItems / paging.perPage);
    const its = await query;
    result.items = its.map(it => it.toObject());
    return result;
  }

  async create(payload: CreateUserDTO): Promise<User> {
    let doc = new this.userModel(payload);
    await doc.save();
    return doc.toObject();
  }

  async update(payload: UpdateUserDTO): Promise<User> {
    const userDoc = await this.userModel.findById(payload.id);
    userDoc.username = payload.username;
    userDoc.name = payload.name;
    userDoc.role = payload.role;
    await userDoc.save();
    return userDoc.toObject();
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UserNotFoundError(`user with username=${username} can't be found`);
    }
    return user.toObject();
  }
}