import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const prerender = true;

// @ts-ignore
export async function load({params}){
    const { project, post } = params; 
    const fp = path.resolve(`src/content/${project}`, `${post}`);

    if(!fs.existsSync(fp)){
        return error(404, 'Post not found');
    }
    
    const text = fs.readFileSync(fp, 'utf-8');
    const { content, data } = matter(text);

    return {
        content,
        metadata: data,
        project
    };
}