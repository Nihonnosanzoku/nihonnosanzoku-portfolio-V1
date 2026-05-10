import { NextRequest } from 'next/server';
import BlogController from '@/server/blog/blog.controller';

const blogController = new BlogController();

export async function GET(req: NextRequest) {
  return blogController.getPosts(req);
}

export async function POST(req: NextRequest) {
  return blogController.createPost(req);
}
