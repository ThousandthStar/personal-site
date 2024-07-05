<script>
    import '../app.css';
    import CurrentProject from '$lib/CurrentProject.svelte';
    import { onMount } from 'svelte';
    import Prism from 'prismjs';
    import 'prismjs/themes/prism.css';
    import 'prismjs/components/prism-rust';
    import '../catppuccin.css';
    import { page } from '$app/stores';
    import FeGithub from '~icons/fe/github';
    import BxlYoutube from '~icons/bxl/youtube';
    import TablerMailFilled from '~icons/tabler/mail-filled'
    import BxlDiscordAlt from '~icons/bxl/discord-alt';
    import MaterialSymbolsArrowBackIosNewRounded from '~icons/material-symbols/arrow-back-ios-new-rounded';
    import MaterialSymbolsLightHomeRounded from '~icons/material-symbols-light/home-rounded';

    let sidebarOpen = false;
    let lastName = $page.url.pathname;

    onMount(() => {
        Prism.highlightAll();
    });

    $:{
        if ($page.url.pathname != lastName){
            Prism.highlightAll();
            sidebarOpen = false;
            lastName = $page.url.pathname;
        }
    }

    function toggleSidebar(){
        sidebarOpen = !sidebarOpen;
    }

    function copyDiscord(){
        navigator.clipboard.writeText('thousandthstar').then(() => {
            alert('Discord username successfully copied to the clipboard.');
        }).catch((e) => {
            alert('Error copying the Discord username to the clipboard. '
                + 'You can enter it manually: `thousandthstar`. \nError: ' +e
            );
        })
    }
</script>
<main>
    <!-- Sidebar -->
    <div class='p-[1rem] z-30 fixed top-0 left-0 w-[300px] h-full bg-theme-mantle transform {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out'>
        <div class='flex justify-end w-full'>
            <button class='w-auto h-auto' on:click={toggleSidebar}>
                <MaterialSymbolsArrowBackIosNewRounded class='size-16 text-theme-surface1' />
            </button>
        </div>
        <h5 class='border-b-2 border-theme-mauve'>projects:</h5>
        <ul>
            <li>
                <a href='/projects/8bit Duels'>8bit Duels</a>
            </li>
        </ul>
        <br>
        <br>
        <h5 class='border-b-2 border-theme-mauve'>other:</h5>
        <ul>
            <li>
                <a href='/about'>about</a>
            </li>
        </ul>
    </div>
    <div class='bg-theme-base w-screen'>
        <!-- Top bar -->
        <div class='z-20 p-[12px] h-[6rem] w-full bg-theme-base fixed flex items-center justify-between'>
            <div class='flex items-center'>
                <button class='w-auto h-auto' on:click={toggleSidebar}>
                    <MaterialSymbolsArrowBackIosNewRounded class='size-16 text-theme-surface1 scale-x-[-1]' />
                </button>
            </div>
            <div class='flex flex-col items-center mx-auto'>
                <h3><a class='text-theme-text font-bold border-theme-text no-underline' href='/'>Émilien's blog</a></h3>
                <CurrentProject/>
            </div>
            <div class='flex items-center mr-0'>
                <a href='/'>
                    <MaterialSymbolsLightHomeRounded class='text-theme-surface1 size-20' />
                </a>
            </div> 
        </div>
        <!-- Main content -->
        <div class='flex justify-center items-start'>
            <div class='p-[28px] pt-[6rem] top-0 min-h-screen w-[calc(100%-56px)] max-w-[1200px]'>
                <slot></slot>
            </div>
        </div>
        <!-- Footer -->
         <footer class='bg-theme-mantle p-[12px]'>
            <div class='flex justify-center'>
                <div class='flex flex-wrap justify-start h-[calc(100%-4rem)] top-0'>
                    <!-- Social links -->
                    <div class='w-96 pl-2 pr-2'>
                        <br>
                        <h5 class='border-b-2 border-theme-mauve'>socials</h5>
                        <a class='inline-flex' href='https://www.youtube.com/channel/UCllwuaF9ac8sNni8v03GomQ' target="_blank">
                            <BxlYoutube class='m-2 size-12 text-theme-text'/>
                        </a>
                    </div>
                    <!-- Contact links -->
                    <div class='w-96 pl-2 pr-2'>
                        <br>
                        <h5 class='border-b-2 border-theme-mauve'>contact</h5>
                        <div class='flex items-start'>
                            <a href="mailto:thousandthstar@gmail.com"  target="_blank">
                                <TablerMailFilled class='m-2 size-12 text-theme-text'/>
                            </a>
                            <button on:click={copyDiscord}>
                                <BxlDiscordAlt class='m-2 size-12 text-theme-text' />
                            </button>
                        </div>
                    </div>
                    <!-- Other links -->
                    <div class='w-96 pl-2 pr-2'>
                        <br>
                        <h5 class='border-b-2 border-theme-mauve'>other</h5>
                        <a class='text-theme-red underline inline-flex' href="https://github.com/ThousandthStar" target="_blank">
                            <FeGithub class='text-theme-text m-2 size-12' />
                        </a>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class='flex items-center justify-center'>
                <span class='text-theme-text mx-auto'>© Émilien Lavallée 2024</span>
            </div>
         </footer>
    </div>
</main>