import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { databaseProviders as connectDatabase } from './mongodbProvider';
import { loginRequired } from './middleware/middlewareDeLogin';
@Module({
    controllers: [],
    providers: [
        connectDatabase,
    ],
    exports: [connectDatabase]
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(loginRequired)
        .exclude({path: 'manager', method: RequestMethod.POST})
        .forRoutes('*')
    }
}