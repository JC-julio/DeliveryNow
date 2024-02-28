import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import saveStore from './CreateStore.usecase.test';
import { config } from 'dotenv';
import DeleteStore from '../../Store/DeleteStore.usecase';
import GetOneStore from '../../Store/GetOneStore.usecase';
config();

test("deve testar o getAll de comércios ")