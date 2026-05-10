import { NextRequest, NextResponse } from 'next/server';
import BlogService from './blog.service';
import CreateBlogDto from './dto/blog.dto';
import ValidationPipe from '../common/pipes/validation.pipe';
import { auth } from '../auth/auth';

export default class BlogController {
  private blogService = new BlogService();

  async getPosts(req: NextRequest) {
    try {
      const posts = await this.blogService.getAllPublishedPosts();
      return NextResponse.json(posts, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  async createPost(req: NextRequest) {
    const session = await auth();
    // Blog yazısı oluşturma sadece Admin yetkisi gerektirir.
    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    try {
      const body = await req.json();
      const { data, errors } = await ValidationPipe(CreateBlogDto, body);
      
      if (errors.length > 0 || !data) {
        return NextResponse.json({ error: 'Doğrulama hatası', details: errors }, { status: 400 });
      }

      const post = await this.blogService.createPost(data, (session.user as any).id);
      return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
