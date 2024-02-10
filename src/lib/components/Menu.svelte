<script lang="ts">
    import { page } from '$app/stores';
</script>

<ul class="nav flex-column gap-3">
    <li class="nav-item">
        <a 
            class="nav-link"
            class:active={$page.route.id === '/_/text-to-speech'} 
            href="/_/text-to-speech"
        >
            Text-to-speech
        </a>
    </li>
    <li class="nav-item">
        <a 
            class="nav-link"
            class:active={$page.route.id === '/_/chat-overlay'} 
            href="/_/chat-overlay"
        >
            Chat overlay
        </a>
    </li>
</ul>
