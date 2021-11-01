<script>
  let size = 'md'
  let extraClasses = ''
  let link = ''

  export { extraClasses as class, size, link as href }

  const sizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'px-2.5 py-1.5 text-xs rounded'
      case 'sm':
        return 'px-3 py-2 text-sm leading-4 rounded-md'
      case 'md':
        return 'px-4 py-2 text-sm rounded-md'
      case 'lg':
        return 'px-4 py-2 text-base rounded-md'
      case 'xl':
        return 'px-6 py-3 text-base rounded-md'
    }
  }
</script>

{#if !['xs', 'sm', 'md', 'lg', 'xl'].includes(size)}
  Supported sizes: ['xs', 'sm', 'md', 'lg', 'xl']
{:else if link}
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    class="inline-flex items-center border border-transparent font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 {sizeClasses()} {extraClasses}"
    on:click
    href={link}
    target="_blank"
  >
    <slot />
  </a>
{:else}
  <button
    type="button"
    class="inline-flex items-center border border-transparent font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 {sizeClasses()} {extraClasses}"
    on:click
  >
    <slot />
  </button>
{/if}
