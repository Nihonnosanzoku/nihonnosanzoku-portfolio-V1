import { IsUrl, IsNotEmpty } from 'class-validator';

export default class DownloadDto {
  @IsUrl({}, { message: 'Geçersiz bir URL girdiniz.' })
  @IsNotEmpty({ message: 'URL alanı boş bırakılamaz.' })
  url: string = '';
}
