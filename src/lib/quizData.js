export const questions = [
	{
		question: 'What is Svelte?',
		answers: [
			'A JavaScript framework that compiles components to efficient JavaScript at build time',
			'A runtime-only JavaScript framework like React',
			'A CSS preprocessor for styling web applications',
		],
		correct: 0,
	},
	{
		question: 'In Svelte 5, what rune is used to declare reactive state?',
		answers: ['$reactive()', '$state()', '$store()'],
		correct: 1,
	},
	{
		question: 'What directive is used to conditionally render a block in Svelte?',
		answers: ['{#if} ... {/if}', '{#when} ... {/when}', '{#show} ... {/show}'],
		correct: 0,
	},
	{
		question: 'How do you loop over a list in Svelte?',
		answers: [
			'{#each items as item} ... {/each}',
			'{#for item of items} ... {/for}',
			'{#loop items as item} ... {/loop}',
		],
		correct: 0,
	},
	{
		question: 'In Svelte 5, what rune replaces the old $: reactive declarations?',
		answers: ['$computed()', '$derived()', '$effect()'],
		correct: 1,
	},
	{
		question: 'What is the purpose of the $effect rune in Svelte 5?',
		answers: [
			'To declare reactive state variables',
			'To run side effects when dependencies change',
			'To compile components ahead of time',
		],
		correct: 1,
	},
	{
		question: 'How does Svelte handle component styling by default?',
		answers: [
			'Styles are global and must be manually scoped',
			'Styles are scoped to each component automatically',
			'Styles must be written in a separate CSS file always',
		],
		correct: 1,
	},
	{
		question: 'What keyword declares reactive props in Svelte 5?',
		answers: ['export let', '$props()', '$inputs()'],
		correct: 1,
	},
	{
		question: 'Which Svelte lifecycle function runs when a component is first rendered?',
		answers: ['onMount', 'onRender', 'onInit'],
		correct: 0,
	},
	{
		question: 'What does the $bindable rune do in Svelte 5?',
		answers: [
			'Declares a prop that can be bound to with the bind: directive',
			'Binds two components together permanently',
			'Creates a global reactive variable',
		],
		correct: 0,
	},
];