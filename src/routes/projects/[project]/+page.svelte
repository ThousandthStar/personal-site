<script>
    import { currentProject } from '$lib/store';
    import { onMount } from 'svelte';
    import PostList from '$lib/PostList.svelte';
    import MarkdownIt from 'markdown-it';
    import ProjectButtons from '$lib/ProjectButtons.svelte';

    export let data;
    const titles = data.titles;
    const previews = data.previews;
    const dates = data.dates;
    const project = data.project;
    const file_names = data.file_names;
    const context = data.context;

    onMount(() => {
        currentProject.set(data.project);
    });

    const md = new MarkdownIt({
        html: true
    });
</script>
<main class='w-full h-full'>
    {@html md.render(context)}
    <ProjectButtons project={project} />
    <PostList titles={titles} previews={previews} dates={dates} project_id={project} file_names={file_names} />
</main> 