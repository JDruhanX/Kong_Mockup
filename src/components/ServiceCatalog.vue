<template>
	<div class="service-hub-layout">
		<!-- Page: Header -->
		<div class="header">
			<div class="title">
				<h1>Service Hub</h1>

				<span>Organize services, manage and track versioning and API service documentation. <a href="/">Learn more</a></span>
			</div>
			<div class="features">
				<div class="feature-item">
					<div class="search-wrapper">
						<span class="material-symbols-rounded search-icon">search</span>
						<input v-model="searchQuery" class="search-input" placeholder="Search">
					</div>
				</div>
				<div class="feature-item">
					<button type="button" class="feature-btn">
						<span class="material-symbols-outlined">add</span>
						Service Package
					</button>
				</div>
			</div>
		</div>

		<!-- Page: Services -->
		<div class="services">
			<div v-if="services?.pageItems && services.pageItems.length > 0" class="items">
				<ServiceCatalogItem v-for="service in services.pageItems" :options="service" :key="service.id" />

				<div v-if="loading" class="services-searching">
					<span class="searching-icon material-symbols-outlined">search</span>
					<span>Requesting Services ..</span>
				</div>
			</div>

			<div class="items-not-found">
				No services found
			</div>
		</div>

		<!-- Zone: Pagination -->
		<div class="pagination" v-if="services?.pageItems && services.pageItems.length > 0">
			<span class="material-symbols-outlined arrow" :class="!services.isPrevious ? 'paginationDisabled' : ''" @click="previousPage">arrow_circle_left</span>

			<div class="pagination-data">
				<span><strong>{{ services.firstItemIndex }} to {{ services.lastItemIndex }}</strong> of {{ services.totalItems }} services</span>
			</div>

			<span class="material-symbols-outlined arrow" :class="!services.isNext ? 'paginationDisabled' : ''" @click="nextPage">arrow_circle_right</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import { ref, watch } from 'vue';
	import ServiceCatalogItem from '@/components/ServiceCatalogItem.vue'
	import useServices from '@/composables/useServices';

	import type { PaginationSet } from '@/types/pagination';

	// Set the search string to a Vue ref
	const searchQuery : Ref <string> = ref('');

	// Set the search string to a Vue ref. Default is 1.
	const currentPage : Ref <number> = ref(1);

	// Maximum services a page can hold before pagination kicks in.
	const maxPageItems : Ref <number> = ref(9);

	// Import services from the composable
	let { services, loading } : { services : PaginationSet, loading : Ref<boolean> } = useServices( searchQuery, currentPage, maxPageItems );

	// Process next page request.
	const nextPage = ( event: MouseEvent ) : MouseEvent =>
	{
		if ( services.isNext )
		{
			currentPage.value++;
		}

		return event;
	}

	// Process previous page request.
	const previousPage = ( event: MouseEvent ) : MouseEvent =>
	{
		if ( services.isPrevious )
		{
			currentPage.value--;
		}

		return event;
	}

	// Watches for a search, resets current page to 1.
	watch( searchQuery, async ( new_search, old_search ) =>
	{
		currentPage.value = 1;
	});
</script>

<style lang="scss" scoped>
	$mobile-bp-md: 1125px;
	$mobile-bp-lg: 1336px;

	.service-hub-layout
	{		
		max-width: 1440px;
		margin: 2rem auto;
		width: 100%;

		.header
		{
			@media ( max-width : $mobile-bp-md )
			{
				width: 100%;
				flex-direction: column !important;
			}

			margin-top: 42px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.title
			{
				@media ( max-width : $mobile-bp-md )
				{
					text-align: center;
				}
				
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-bottom: 14px;
				padding: 0px 12px;
				flex-wrap: wrap;
				color: #3C4557;

				h1
				{
					@media ( max-width : $mobile-bp-md )
					{
						margin-top: 0px;
						width: 100%;
						text-align: center;
					}

					margin-top: 0px;
					margin-bottom: 16px;
					font-style: normal;
					font-weight: 700;
					font-size: 32px;
					line-height: 36px;
				}

				span
				{
					font-style: normal;
					font-weight: 400;
					font-size: 16px;
					line-height: 24px;

					a
					{
						text-decoration: none; 
					}
				}
			}
			.features
			{
				display: flex;
				flex-direction: row;
				padding-right: 12px;

				@media ( max-width : $mobile-bp-md )
				{
					margin-top: 30px;
					flex-direction: column !important;
				}

				.feature-item
				{
					@media ( max-width : $mobile-bp-md )
					{
						width: 300px;
						margin-bottom: 16px;
						align-self: center;
					}
					
					.feature-btn
					{
						@media ( max-width : $mobile-bp-md )
						{
							width: 100% !important;
						}
						
						cursor: pointer;
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 12px 24px 12px 16px;
						width: 200px;
						height: 44px;
						background: #07A88D;
						border-radius: 100px;
						flex: none;
						order: 1;
						flex-grow: 0;
						border: 0;
						color: #FFFFFF;
						font-weight: 600;
						font-size: 16px;
						line-height: 20px;

						.material-symbols-outlined
						{
							font-variation-settings: 'FILL' 1, 'opsz' 24, 'wght' 700;
							padding-right: 8px;
						}

						&:hover
						{
							background-color: #08bea0;
						}
					}
					
					.search-wrapper
					{
						@media ( max-width : $mobile-bp-md )
						{
							width: 100% !important;
						}

						display: flex;
						align-items: center;
						width: 209px;
						height: 44px;
						margin-right: 24px;

						.search-icon
						{
							position: absolute;
							padding-left: 10px;
							color: #9b9b9b;
							font-size: 20px;
						}
					}

					input 
					{
						padding-left: 38px;
						padding-right: 16px;
						margin:0px;
						border: 1px solid #E7E7EC;
						border-radius: 4px;
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.services
		{
			.items
			{
				display: flex;
				flex-wrap: wrap;
				flex: 1 1 auto;
				padding: 25px 12px 0 12px;
				position: relative;
					
				.services-searching
				{
					position: absolute;
					z-index: 9999;
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: calc(100% - 25px);
					height: calc(100% - 60px);
					text-align: center;
					color: #ffffff;
					background-color: rgba(65, 65, 65, 0.7);

					.searching-icon
					{
						font-size: 42px;
						margin-bottom: 12px;
					}
				}
			}

			.items-not-found
			{
				display: flex;
				justify-content: center;
				padding: 72px;
			}
		}

		.pagination
		{
			display: flex;
			justify-content: center;
			padding: 0 12px;

			.arrow
			{
				cursor: pointer;
				font-size: 42px;
				color: #A6C6FF;
				-webkit-user-select: none;
				-ms-user-select: none;
				user-select: none;

				&:hover
				{
					color: #5783ce;
				}

				&:first-child
				{
					padding-right: 16px;
				}

				&:last-child
				{
					padding-left: 16px;
				}
			}

			.pagination-data
			{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				font-weight: 400;
				font-size: 13px;
				line-height: 20px;
				text-align: center;
				color: #3C4557;
				mix-blend-mode: normal;
				opacity: 0.7;
			}

			.paginationDisabled
			{
				color: rgba(0, 0, 0, 0.1);
				cursor: default;

				&:hover
				{
					color: rgba(0, 0, 0, 0.1);
				}
			}
		}
	}
</style>
