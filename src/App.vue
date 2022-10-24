<template>
	<Header />

	<main>
		<router-view />
	</main>
</template>

<script setup lang="ts">
	import Header from '@/components/core/Header.vue';
</script>

<style lang="scss">
	html
	{
		margin: 0;
		padding: 0;
		font-size: 10px;
	}

	body
	{
		font-family: Inter, Arial, sans-serif;
		font-weight: 400;
		font-size: 1.6rem;
		line-height: 1.2;
		margin: 0 auto;
		background: #F8F8FA;
	}
</style>
