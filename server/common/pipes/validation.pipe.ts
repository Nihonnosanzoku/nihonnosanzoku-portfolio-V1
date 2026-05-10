import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export default async function ValidationPipe<T>(
  schema: new () => T,
  requestData: any
): Promise<{ data: T | null; errors: any[] }> {
  const transformed = plainToInstance(schema, requestData);
  const errors = await validate(transformed as object);

  if (errors.length > 0) {
    const formattedErrors = errors.map((err) => ({
      property: err.property,
      constraints: err.constraints,
    }));
    return { data: null, errors: formattedErrors };
  }

  return { data: transformed, errors: [] };
}
