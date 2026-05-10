import BlogRepository from './blog.repository';
import CreateBlogDto from './dto/blog.dto';
import Slugify from '../utils/Slugify';

export default class BlogService {
  private blogRepository = new BlogRepository();

  async getAllPublishedPosts() {
    return await this.blogRepository.findPublishedPosts();
  }

  async createPost(data: CreateBlogDto, authorId: string) {
    const slug = Slugify.create(data.title);
    const finalSlug = slug + '-' + Date.now().toString().slice(-4);
    
    return await this.blogRepository.createPost(
      data.title,
      data.content,
      finalSlug,
      data.published ?? false,
      authorId
    );
  }

  async getAllPosts() {
    return await this.blogRepository.findAllPosts();
  }

  async deletePost(id: string) {
    return await this.blogRepository.deletePost(id);
  }

  async updatePost(id: string, title: string, content: string, published: boolean) {
    return await this.blogRepository.updatePost(id, title, content, published);
  }
}
