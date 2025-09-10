import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { I18nService, I18nValidationPipe } from 'nestjs-i18n';
import { CustomI18nValidationExceptionFilter } from './guard/custom-i18n-validation-exception-filter.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('FE_URL'),
    credentials: true,
  });

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  
  app.useGlobalFilters(
    new CustomI18nValidationExceptionFilter(app.get(I18nService)),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
