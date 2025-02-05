import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { S3TempStorageServicePort } from 'src/applications/port/in-bound/s3-temp-storage.service.port';
import { TempS3StorageUrlDto } from '../out-bound/dtos/response/response-upload-file-url.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('image')
@Controller('image')
export class S3StorageController {
  constructor(
    private readonly s3TempStorageServicPort: S3TempStorageServicePort,
  ) {}

  @Post('temp')
  @ApiOperation({
    summary: '임시 S3 이미지 업로드 api',
    description: '임시 S3 이미지 업로드 api',
  })
  @ApiResponse({
    status: 201,
    description: '성공',
    type: TempS3StorageUrlDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (파일 형식 오류)',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '지원하지 않는 파일 형식입니다.' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '파일을 찾을 수 없음',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '파일을 찾을 수 없습니다.' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: '서버 오류가 발생했습니다. 다시 시도해주세요.',
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 4))
  @HttpCode(HttpStatus.CREATED)
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.s3TempStorageServicPort.uploadFile(files);
  }
};
