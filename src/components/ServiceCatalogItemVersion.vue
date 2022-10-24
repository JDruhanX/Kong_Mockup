<template>
	<div class="service-item-versions">
		<div class="versions-list">
			<div class="versions-list-item" v-for="version in versions" :key="version.id">
				<div class="versions-list-item-data">
					<div class="item-version">v{{ version.name }}</div>
					<div class="item-details">{{ version.description}}</div>
					<div class="item-type">
						<span :class="type === 'HTTP' ? 'type-active' : ''">HTTP</span>
						<span :class="type === 'REST' ? 'type-active' : ''">REST</span>
					</div>
					<div v-if="version.developer" class="item-developer">
						<div class="item-developer-group">
							<div class="developer-identity">
								<span class="developer-avatar">
									<img :src="version.developer.avatar" />
								</span>
								<span class="developer-name">{{ version.developer.name }}</span>
							</div>
							<span class="developer-updated">{{ friendlyDate( version.updated_at ) }} days ago</span>
						</div>
					</div>
				</div>
				<div class="version-list-item-divider"></div>
			</div>
		</div>
	</div>
</template>

<script setup  lang="ts">
	import { defineProps, reactive, ref, Ref, computed } from 'vue';

	import type { ServiceRecordVersion } from '@/types/service_catalog';

	// Define incoming props.
	const props = defineProps <{ versions: ServiceRecordVersion[], type : string }>();

	// Converts date to friendly.
	const friendlyDate = ( updatedDateRaw ) =>
    {
		const today = new Date();		
		const updatedDate = new Date( updatedDateRaw );
		const daysAgo = Math.ceil(( today - updatedDate ) / ( 1000 * 3600 * 24 ) );

		return daysAgo;
	};
</script>

<style lang="scss" scoped>
	.service-item-versions
	{
		padding: 0 42px 24px 32px;

		.versions-list
		{
			width: 100%;

			.versions-list-item
			{
				.versions-list-item-data
				{
					display: inline-flex;
					flex-direction: row;
					flex-wrap:wrap;
					align-items: center;
					width: 100%;
					padding-bottom: 12px;
					padding-top: 12px;

					.item-version
					{
						width: 65px;
						font-style: normal;
						font-weight: 600;
						font-size: 13px;
						line-height: 24px;
						color: #262626;
					}

					.item-details
					{
						width: 248px;
						font-style: normal;
						font-weight: 400;
						font-size: 12px;
						line-height: 16px;
						color: #8A8A8A;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.item-type
					{
						font-style: normal;
						font-weight: 500;
						font-size: 10px;
						line-height: 14px;
						display: flex;
						align-items: center;
						color: #1155CB;
						opacity: 0.9;
						padding: 1.5px 6px 2.5px;
						
						border-radius: 4px;

						span
						{
							margin: 0 4px;
							padding: 1.5px 6px 2.5px;
							background: #F8F8FA;
						}

						.type-active
						{
							background: #BDD3F9 !important;
							border-radius: 4px;
						}
					}

					.item-developer
					{
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						flex-grow: 1;

						.item-developer-group
						{
							display: flex;
							flex-direction: column;
							justify-content: center;

							.developer-identity
							{
								display: flex;
								flex-direction: row;
								align-items: center;

								.developer-avatar
								{
									img
									{
										display: inline-block;
										height: 20px;
										width: 20px;
										overflow: hidden;
										border-radius: 50%;
										vertical-align: middle;
										display: flex;
										flex: 1 0 auto;
										max-height: 100%;
										max-width: 100%;
										overflow: hidden;
										position: relative;
										margin-right: 6px;
									}
								}

								.developer-name
								{
									font-style: normal;
									font-weight: 600;
									font-size: 13px;
									line-height: 24px;
									color: #3C4557;
								}
							}

							.developer-updated
							{
								text-align: right;
								font-style: normal;
								font-weight: 400;
								font-size: 12px;
								line-height: 16px;
								color: #8A8A8A;
							}
						}
					}
				}

				.version-list-item-divider
				{
					border: 1px solid #F1F1F5;
					width: 100%;
				}

				&:last-child
				{
					.version-list-item-divider
					{
						display: none;
					}
				}

				&:first-child
				{
					.versions-list-item-data
					{
						padding-top: 0;
					}
				}
			}
		}
	}

	
</style>
