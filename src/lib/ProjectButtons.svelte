<script>
    export let project;

    import FeGithub from '~icons/fe/github';
    import BxlYoutube from '~icons/bxl/youtube';
</script>
{#if project == '8bit Duels'}
    <div class='flex items-start'>
        <a href='https://youtu.be/maKARl89Qos?si=tkPacktVzlQb7Dr4' target='_blank'>
            <BxlYoutube class='m-2 text-theme-text size-12'/>
        </a>
        <a href='https://github.com/ThousandthStar/8bit-duels' target='_blank'>
            <FeGithub class='m-2 text-theme-text size-12'/>
        </a>
    </div>
{/if}