import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../', 'public'),
            serveRoot: '/public',
            serveStaticOptions: {
                setHeaders: (res) => {
                    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
                },
            }
        }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
    ]
})
export class CoreModule { }
