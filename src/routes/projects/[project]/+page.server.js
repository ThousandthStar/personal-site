import fs from 'node:fs';
import path from 'path';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({params}){
    const { project } = params;
    const files = fs.readdirSync(`src/content/${project}`);
    let titles = [];
    let previews = [];
    let dates = [];
    let file_names = [];
    files.forEach(file => {
        file_names.push(file);
        const fp = path.resolve(`src/content/${project}`, file);
        const text = fs.readFileSync(fp, 'utf-8');
        const {content, data} = matter(text);
        titles.push(data.title);
        const prev = content.slice(0, 500)+'...';
        const regex = /([#>*-]+\s?|`{1,3}|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\)|\*\*|__|\*|_|\[|\]|\(|\))/g;
        const raw = prev.replace(regex, '');
        previews.push(raw);
        dates.push(new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    });

    const fp = path.resolve(`src/content`, `${project}.md`);

    if(!fs.existsSync(fp)){
        return error(404, 'Context not found');
    }

    const context = fs.readFileSync(fp, 'utf-8');

    return {
        titles,
        previews,
        dates,
        file_names,
        project,
        context,
    }
}