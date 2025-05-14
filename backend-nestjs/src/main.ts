/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transformOptions: {
  //       enableImplicitConversion: true, // allow conversion underneath
  //     },
  //   }),
  // );
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  // app.use(cookieParser());
  // app.use(bodyParser.json({ limit: '100mb' }));

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
