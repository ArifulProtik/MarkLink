import { All, Controller, Req, Res } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from 'src/lib/auth';

@Controller('api/auth')
export class AuthController {
  @All('*splat')
  async handAuth(@Req() req, @Res() res) {
    const handler = toNodeHandler(auth);
    return handler(req, res);
  }
}
