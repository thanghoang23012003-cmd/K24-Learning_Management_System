import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
} from '@nestjs/common';
import { I18nValidationException, I18nService } from 'nestjs-i18n';

@Catch(I18nValidationException)
export class CustomI18nValidationExceptionFilter
  implements ExceptionFilter<I18nValidationException>
{
  constructor(
    private readonly i18n: I18nService
  ) {}

  async catch(exception: I18nValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const lang = request.query.lang || 'en';

    // duyệt từng error và dịch property name
    const messages = await Promise.all(
      exception.errors.map(async (error) => {
        const propertyTranslated = await this.i18n.translate(
          `properties.${error.property}`,
          { lang },
        );
        const firstConstraint = Object.values(error.constraints || {})[0];

        return await this.i18n.translate(firstConstraint, {
          lang,
          args: {
            propertyTranslated: propertyTranslated,
            value: error.value,
            constraints: error.contexts?.constraints ?? [],
          },
        });
      }),
    );

    response.status(400).json({
      statusCode: 400,
      message: messages,
      error: 'Bad Request',
    });
  }
}
