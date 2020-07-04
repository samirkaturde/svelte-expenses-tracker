<script>
    export let value = 0;
    export let mode = 'balance';
    import { slide } from 'svelte/transition';

    $:label = mode.toUpperCase();
    $:cssClass = getCssClass(mode);

    const getCssClass = (mode) => {
        switch (mode) {
            case 'balance':
                return 'is-info'
            case 'income':
                return 'is-success'
            case 'expenses':
                return 'is-danger'
        }
    }
</script>

<div class="notification {cssClass} has-text-centered is-light" transition:slide={{duration:500}}>
  {label} :
  <strong>{value}</strong>
</div>
