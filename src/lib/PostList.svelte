<script>
    import { goto } from "$app/navigation";

    /**
     * @type {string[]}
     */
    export let titles;
    /**
     * @type {string[]}
     */
    export let previews;
    /**
     * @type {string[]}
     */
    export let dates;
    /**
     * @type {string[]}
     */
    export let file_names;
    export let project_id;
    
    let articles = [];
    titles.forEach((_, i) => {
        articles.push({
            title: titles[i],
            preview: previews[i],
            date: dates[i],
            file_name: file_names[i]
        });
    });
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    function changeLink(link){
        goto(link);
    }
</script>
<div class='flex flex-col justify-center items-start w-full h-full'>
    {#each articles as article}
        <div class='p-3 relative w-full max-w-[600px] mx-auto'>
            <div class='bg-theme-peach bg-gradient-to-br from-theme-mauve to-theme-peach rounded-xl w-full h-[8.8rem] z-0 ml-1 mt-1'></div>
            <div class='bg-theme-surface0 rounded-lg p-4 pt-0 w-full h-[8.8rem] z-10 -ml-1 -mt-[9.15rem] overflow-hidden'>
                <h4 class='truncate'>{article.title}</h4>
                <p class='text-theme-blue'>{article.date}</p>
                <p class='text-sm text-theme-subtext1 break-words'>{article.preview}</p>
            </div>
            <!-- svelte-ignore a11y-missing-content -->
            <a class='absolute inset-0' href='/projects/{project_id}/{article.file_name}'></a>
        </div>
    {/each}
</div>