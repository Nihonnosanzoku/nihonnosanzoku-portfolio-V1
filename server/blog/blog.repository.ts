import { prisma } from '../config/prisma.config';
import CreateBlogDto from './dto/blog.dto';

export default class BlogRepository {
  async findPublishedPosts() {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true, image: true } } }
    });
  }

  async createPost(title: string, content: string, slug: string, published: boolean, authorId: string) {
    return await prisma.post.create({
      data: {
        title,
        content,
        slug,
        published,
        authorId
      }
    });
  }

  async findAllPosts() {
    return await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true, image: true } } }
    });
  }

  async deletePost(id: string) {
    return await prisma.post.delete({
      where: { id }
    });
  }

  async updatePost(id: string, title: string, content: string, published: boolean) {
    return await prisma.post.update({
      where: { id },
      data: { title, content, published }
    });
  }
}
