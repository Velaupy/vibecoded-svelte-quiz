<script>
	import { questions } from './quizData.js';

	let currentIndex = $state(0);
	let selectedAnswer = $state(null);
	let answered = $state(false);
	let score = $state(0);
	let finished = $state(false);
	let answerStatus = $state(null); // 'correct' | 'wrong' | null

	const total = questions.length;
	const current = $derived(questions[currentIndex]);
	const progress = $derived(Math.round(((currentIndex + (answered ? 1 : 0)) / total) * 100));

	function selectAnswer(index) {
		if (answered) return;
		selectedAnswer = index;
		answered = true;
		if (index === current.correct) {
			score++;
			answerStatus = 'correct';
		} else {
			answerStatus = 'wrong';
		}
	}

	function next() {
		if (currentIndex < total - 1) {
			currentIndex++;
			selectedAnswer = null;
			answered = false;
			answerStatus = null;
		} else {
			finished = true;
		}
	}

	function restart() {
		currentIndex = 0;
		selectedAnswer = null;
		answered = false;
		score = 0;
		finished = false;
		answerStatus = null;
	}
</script>

<div class="quiz-container">
	{#if finished}
		<div class="result-screen">
			<div class="result-icon">{score >= 7 ? '★' : score >= 5 ? '✓' : '○'}</div>
			<h1>Quiz Complete!</h1>
			<p class="score-text">
				You scored <span class="score-value">{score}</span> out of <span class="score-total">{total}</span>
			</p>
			<p class="score-message">
				{#if score === total}
					Perfect score! You're a Svelte expert.
				{:else if score >= 7}
					Great job! You know Svelte well.
				{:else if score >= 5}
					Not bad! Keep learning Svelte.
				{:else}
					Keep practicing — you'll get there!
				{/if}
			</p>
			<button class="restart-btn" onclick={restart}>Try Again</button>
		</div>
	{:else}
		<div class="quiz-header">
			<div class="progress-info">
				<span class="question-counter">Question {currentIndex + 1} of {total}</span>
				<span class="current-score">Score: {score}</span>
			</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>
		</div>

		<div class="question-card">
			<h2 class="question-text">{current.question}</h2>

			<div class="answers">
				{#each current.answers as answer, i}
					<button
						class="answer-btn"
						class:selected={selectedAnswer === i}
						class:correct={answered && i === current.correct}
						class:wrong={answered && i === selectedAnswer && i !== current.correct}
						class:dimmed={answered && i !== current.correct && i !== selectedAnswer}
						onclick={() => selectAnswer(i)}
						disabled={answered}
					>
						<span class="answer-letter">{String.fromCharCode(65 + i)}</span>
						<span class="answer-text">{answer}</span>
						{#if answered && i === current.correct}
							<span class="answer-mark correct-mark">✓</span>
						{/if}
						{#if answered && i === selectedAnswer && i !== current.correct}
							<span class="answer-mark wrong-mark">✕</span>
						{/if}
					</button>
				{/each}
			</div>

			{#if answered}
				<div class="feedback" class:correct-feedback={answerStatus === 'correct'} class:wrong-feedback={answerStatus === 'wrong'}>
					{#if answerStatus === 'correct'}
						Correct!
					{:else}
						Not quite — the correct answer is {String.fromCharCode(65 + current.correct)}.
					{/if}
				</div>
			{/if}

			<button class="next-btn" onclick={next} disabled={!answered}>
				{currentIndex < total - 1 ? 'Next Question' : 'See Results'}
			</button>
		</div>
	{/if}
</div>

<style>
	.quiz-container {
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
		padding: 40px 24px;
		text-align: left;
	}

	.quiz-header {
		margin-bottom: 32px;
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.question-counter {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-h);
	}

	.current-score {
		font-size: 14px;
		color: var(--text);
	}

	.progress-bar {
		height: 6px;
		background: var(--border);
		border-radius: 999px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 999px;
		transition: width 0.4s ease;
	}

	.question-card {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 32px;
		box-shadow: var(--shadow);
	}

	.question-text {
		font-size: 22px;
		line-height: 1.35;
		margin-bottom: 24px;
		color: var(--text-h);
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.answer-btn {
		display: flex;
		align-items: center;
		gap: 14px;
		width: 100%;
		padding: 16px 18px;
		border: 2px solid var(--border);
		border-radius: 10px;
		background: var(--bg);
		color: var(--text-h);
		font-size: 16px;
		font-family: var(--sans);
		text-align: left;
		cursor: pointer;
		transition: border-color 0.2s, background 0.2s, transform 0.1s;
	}

	.answer-btn:not(:disabled):hover {
		border-color: var(--accent-border);
		background: var(--accent-bg);
	}

	.answer-btn:not(:disabled):active {
		transform: scale(0.99);
	}

	.answer-btn:disabled {
		cursor: default;
	}

	.answer-btn.selected {
		border-color: var(--accent);
		background: var(--accent-bg);
	}

	.answer-btn.correct {
		border-color: #22c55e;
		background: rgba(34, 197, 94, 0.1);
	}

	.answer-btn.wrong {
		border-color: #ef4444;
		background: rgba(239, 68, 68, 0.1);
	}

	.answer-btn.dimmed {
		opacity: 0.5;
	}

	.answer-letter {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		min-width: 28px;
		border-radius: 50%;
		background: var(--code-bg);
		font-size: 13px;
		font-weight: 700;
		color: var(--text);
	}

	.answer-btn.correct .answer-letter {
		background: #22c55e;
		color: #fff;
	}

	.answer-btn.wrong .answer-letter {
		background: #ef4444;
		color: #fff;
	}

	.answer-text {
		flex: 1;
		line-height: 1.4;
	}

	.answer-mark {
		font-size: 18px;
		font-weight: 700;
	}

	.correct-mark {
		color: #22c55e;
	}

	.wrong-mark {
		color: #ef4444;
	}

	.feedback {
		margin-top: 20px;
		padding: 14px 18px;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 500;
		text-align: center;
	}

	.correct-feedback {
		background: rgba(34, 197, 94, 0.12);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}

	.wrong-feedback {
		background: rgba(239, 68, 68, 0.12);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.next-btn {
		width: 100%;
		margin-top: 24px;
		padding: 15px;
		border: none;
		border-radius: 10px;
		background: var(--accent);
		color: #fff;
		font-size: 16px;
		font-weight: 600;
		font-family: var(--sans);
		cursor: pointer;
		transition: opacity 0.2s, transform 0.1s;
	}

	.next-btn:not(:disabled):hover {
		opacity: 0.9;
	}

	.next-btn:not(:disabled):active {
		transform: scale(0.99);
	}

	.next-btn:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.result-screen {
		text-align: center;
		padding: 48px 24px;
	}

	.result-icon {
		font-size: 64px;
		color: var(--accent);
		margin-bottom: 16px;
	}

	.score-text {
		font-size: 20px;
		margin-bottom: 12px;
		color: var(--text);
	}

	.score-value {
		font-size: 32px;
		font-weight: 700;
		color: var(--text-h);
	}

	.score-total {
		font-size: 22px;
		color: var(--text);
	}

	.score-message {
		font-size: 16px;
		color: var(--text);
		margin-bottom: 32px;
	}

	.restart-btn {
		padding: 14px 40px;
		border: none;
		border-radius: 10px;
		background: var(--accent);
		color: #fff;
		font-size: 16px;
		font-weight: 600;
		font-family: var(--sans);
		cursor: pointer;
		transition: opacity 0.2s, transform 0.1s;
	}

	.restart-btn:hover {
		opacity: 0.9;
	}

	.restart-btn:active {
		transform: scale(0.99);
	}

	@media (max-width: 1024px) {
		.quiz-container {
			padding: 24px 16px;
		}
		.question-card {
			padding: 20px;
		}
		.question-text {
			font-size: 19px;
		}
		.answer-btn {
			padding: 14px 14px;
			font-size: 15px;
		}
	}
</style>