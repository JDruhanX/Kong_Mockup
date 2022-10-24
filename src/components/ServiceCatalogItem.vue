<template>
	<div class="service-item">
		<div class="service-item-card">
			<div class="header">
				<div class="published-status">
					<span v-if="props.options.published" class="icon published material-symbols-outlined">done</span>
					<span v-if="!props.options.published" class="icon unpublished material-symbols-outlined">close</span>
					<div class="published-status-text">{{ publishedStatus() }}</div>
				</div>
				<div class="version-status" @click="versions ? showVersions = true : false;">
					{{ versions }} version{{ versions > 1 ? 's' : '' }}
				</div>
			</div>
			<div class="content">
				<div class="service-name">
					{{ props.options.name }}
				</div>
				<div class="service-desc">
					{{ props.options.description }}
				</div>
			</div>
			<div v-if="props.options.metrics" class="footer">
				<div class="service-stats">
					<div class="service-stats-item">
						<span class="point-good material-symbols-outlined">brightness_1</span>
						<div class="service-stats-item-text">
							<span class="stat-data">{{ props.options.metrics!.latency }}ms</span>
							<span>latency</span>
						</div>
					</div>
					<div class="service-stats-item">
						<span class="point-good material-symbols-outlined">brightness_1</span>
						<div class="service-stats-item-text">
							<span class="stat-data">{{ percentTrim( props.options.metrics!.uptime! ) }}%</span>
							<span>uptime</span>
						</div>
					</div>
					<div class="service-stats-item">
						<span class="point-good material-symbols-outlined">brightness_1</span>
						<div class="service-stats-item-text">
							<span class="stat-data">{{ requestTrim( props.options.metrics!.requests! ) }}k</span>
							<span>requests</span>
							<span class="point-bad point-tiny material-symbols-outlined">brightness_1</span>
							<span class="stat-data">{{ percentTrim( props.options.metrics!.errors! ) }}%</span>
							<span>errors</span>
						</div>
					</div>
				</div>
				<div v-if="devAvatars" class="service-devs">
					<span v-if="devAvatars.length > 2" class="service-dev dev-priority-1">
						<span class="service-devs-extra">
							+{{ devAvatars.length - 2 }}
						</span>
					</span>
					<span v-if="devAvatars[0]" class="service-dev dev-priority-2">
						<img :src="devAvatars[0]" />
					</span>
					<span v-if="devAvatars[1]" class="service-dev dev-priority-3">
						<img :src="devAvatars[1]" />
					</span>
				</div>
			</div>
			<div v-if="!props.options.metrics" class="footer">
				<div class="service-stats">
					<div class="service-stats-item">
						<span class="point-bad material-symbols-outlined">brightness_1</span>
						<div class="service-stats-item-text">
							<span>Not configured with runtime yet</span>
						</div>
					</div>
				</div>
			</div>
		</div>

	<div v-if="showVersions" @click.self.prevent="showVersions = false" class="overlay">
		<div class="overlay-card">
			<div class="overlay-system-bar">
				<span class="overlay-title">Versions ({{ props.options.versions.length }})</span>
				<span @click="showVersions = false" class="material-symbols-outlined">close</span>
			</div>
			<ServiceItemVersion :versions="props.options.versions" :type="props.options.type" />
		</div>
	</div>
	</div>
</template>

<script setup  lang="ts">
	import { defineProps, reactive, ref, Ref } from 'vue';
	import ServiceItemVersion from '@/components/ServiceCatalogItemVersion.vue';

	import type { ServiceRecord } from '@/types/service_catalog';

	// Define incoming props.
	const props = defineProps <{ options: ServiceRecord }>();

	// Initialize versions dialog flag.
	const showVersions : Ref <boolean> = ref( false );

	// Converts decimal to percent and trims at 2 decimal points.
	const percentTrim = ( value : number ) =>
	{
		return ( value * 100 ).toFixed( 2 );
	}

	// Convert value to thousands.
	const requestTrim = ( value : number ) =>
	{
		return ( value / 1000 ).toFixed( 0 );
	}

	// Returns published status based on flag.
	const publishedStatus = () =>
	{
		if ( props.options.published )
		{
			return 'Published to portal'
		}

		return 'Unpublished';
	};

	// Number of versions in the service.
	const versions : Ref <number> = ref( 0 );
		
	// Calculate number of versions.
	versions.value = props.options.versions ? props.options.versions.length : 0;

	const devAvatars = reactive<string[]>([]);

	// Get the developer avatars.
	if ( versions.value > 0 )
	{
		props.options.versions.forEach( ( version ) =>
		{
			if ( version.developer )
			{
				devAvatars.push( version.developer.avatar! );
			}
		});
	}
</script>

<style lang="scss" scoped>
	$mobile-bp-md: 1125px;
	$mobile-bp-lg: 1336px;

	.service-item
	{
		flex: 0 0 33.3333333333%;
		max-width: 33.3333333333%;
		display: flex;
		flex-direction: column;
		
		@media ( min-width : $mobile-bp-lg )
		{
			&:nth-child(3n)
			{
				.service-item-card
				{
					margin-right: 0px !important;
				}
			}
		}
		

		@media ( max-width : $mobile-bp-lg )
		{
			flex: 0 0 50%;
			max-width: 50%;

			&:nth-child(even)
			{
				.service-item-card
				{
					margin-right: 0px !important;
				}
			}
		}

		@media ( max-width : $mobile-bp-md )
		{
			flex: 0 0 100%;
			max-width: 100%;
		}

		.service-item-card
		{
			cursor: pointer;
			display: flex;
			flex-direction: column;
			min-width: 424px;
			height: 242px;
			border-radius: 5px;
			background: #FFFFFF;
			border-radius: 2px;
			margin-right: 35px;
			margin-bottom: 35px;

			@media ( max-width : $mobile-bp-md )
			{
				margin-right: 0px;
			}

			&:hover
			{
				box-shadow: 0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)!important;
				transition: box-shadow 0.3s ease-in-out;
			}

			.header
			{
				display: flex;
				justify-content: space-between;
				padding: 20px 20px 10px 20px;

				.published-status
				{
					display: flex;
					flex-direction: row;
					align-items: flex-start;
					font-style: normal;
					font-weight: 600;
					font-size: 20px;
					line-height: 24px;
					color: #3C4557;
					font-style: normal;
					font-weight: 400;
					font-size: 12px;
					line-height: 16px;
					color: #3C4557;
					opacity: 0.7;

					.published-status-text
					{
						margin-top: 2px;
					}

					.icon
					{
						font-size: 18px;
						font-variation-settings: 'FILL' 1, 'opsz' 18, 'wght' 700;
						margin-right: 6px;
					}
					
					.published
					{
						color: #14B59A;
					}

					.unpublished
					{
						color: #ADB6C8;
					}
				}

				.version-status
				{
					display: flex;
					flex-direction: row;
					align-items: flex-start;
					padding: 9px 16px 8px;
					gap: 8px;
					background: #F2F6FE;
					border-radius: 100px;
					font-style: normal;
					font-weight: 600;
					font-size: 13px;
					line-height: 16px;
					text-align: center;
					color: #5888DB;

					&:hover
					{
						background: #7fa4f3;
						color: #FFFFFF;
					}
				}
			}

			.content
			{
				display: flex;
				flex-direction: column;
				padding: 0 20px;

				.service-name
				{
					font-style: normal;
					font-weight: 600;
					font-size: 20px;
					line-height: 24px;
					color: #3C4557;
				}

				.service-desc
				{
					margin-top: 10px;
					font-style: normal;
					font-weight: 400;
					font-size: 13px;
					line-height: 20px;
					color: #707888;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}

			.footer
			{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				padding: 20px 20px 20px 20px;
				height: 100%;

				.service-stats
				{
					.service-stats-item
					{
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;

						.service-stats-item-text
						{
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: center;
							margin-left: 8px;
							font-style: normal;
							font-weight: 500;
							font-size: 12px;
							line-height: 16px;
							color: #838383;

							.stat-data
							{
								margin-right: 6px;
								font-size: 12px !important;
								color: #3C4557 !important;
								font-weight: 600 !important;
							}
						}
					}
				}

				.service-devs
				{
					display: flex;
					flex-direction: row;

					.service-dev
					{
						display: inline-block;
						height: 32px;
						width: 32px;
						overflow: hidden;
						border-radius: 50%;
						vertical-align: middle;
						display: flex;
						flex: 1 0 auto;
						max-height: 100%;
						max-width: 100%;
						overflow: hidden;
						position: relative;
					}

					.service-dev:not(:first-child)
					{
						margin-left: -12px;
						-webkit-mask:radial-gradient( circle 55px at 5px 50%,transparent 99%,#fff 100% );
								mask:radial-gradient( circle 55px at 5px 50%,transparent 99%,#fff 100% );
					}

					.service-dev img 
					{
						width: 100%;
						display: block;
					}

					.service-devs-extra
					{
						height: 32px;
						width: 32px;
						flex: none;
						align-items: center;
						display: inline-flex;
						justify-content: center;
						overflow: hidden;
						vertical-align: middle;
						border-radius: 50%;
						background: #F1F1F8;
						font-style: normal;
						font-weight: 600;
						font-size: 12px;
						line-height: 24px;
						letter-spacing: 2px;
						color: #777D8A;
					}

					.dev-priority-1
					{
						z-index: 3;
					}

					.dev-priority-2
					{
						z-index: 2;
					}

					.dev-priority-3
					{
						z-index: 1;
					}
				}

				.point-good
				{
					font-variation-settings: 'FILL' 1;
					font-size: 8px;
					color: #42D782;
				}

				.point-bad
				{
					font-variation-settings: 'FILL' 1;
					font-size: 8px;
					color: #B6B6BD;
				}

				.point-tiny
				{
					font-size: 4px;
					margin: 0 8px;
				}
			}
		}
	}

	.overlay
	{
		z-index: 9998;
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		border-color: rgb(33, 33, 33);

		.overlay-card
		{
			z-index: 9999;
			box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
			border-radius: 4px;
			background-color: #fff;
			border-width: thin;
			display: block;
			outline: none;
			text-decoration: none;
			overflow-wrap: break-word;
			position: relative;
			white-space: normal;
			width: 100%;
			max-width: 765px;

			.overlay-system-bar
			{
				color: rgba(0, 0, 0, 0.3);
				font-size: 1.5rem!important;
				font-weight: 400;
				letter-spacing: normal!important;
				align-items: center;
				display: flex;
				justify-content: space-between;
				padding: 24px 24px 12px 24px;
				font-size: 1.25rem;
				font-weight: 500;
				letter-spacing: .0125em;
				line-height: 2rem;
				word-break: break-all;

				.overlay-title
				{
					font-style: normal;
					font-weight: 600;
					font-size: 16px;
					line-height: 24px;
					color: #0B172D;
				}

				.material-symbols-outlined
				{
					cursor: pointer;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30px;
					height: 30px;

					&:hover
					{
						color: rgba(0, 0, 0, 0.8);
					}
				}
			}
		}
	}
</style>
