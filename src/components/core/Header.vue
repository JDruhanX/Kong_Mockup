<template>
	<header>
		<div class="nav">
			<router-link to="/">
				<img src="@/assets/images/logo_konnect.png" />
			</router-link>

			<div class="nav-items nav-desktop">
				<div class="nav-item">
					<span class="material-symbols-outlined">group</span>
					<div class="nav-item-label">
						Organization
					</div>
				</div>

				<div class="nav-item">
					<span class="material-symbols-outlined">settings</span>
					<div class="nav-item-label">
						Settings
					</div>
				</div>

				<div class="nav-item nav-profile">
					<div class="nav-profile-icon">
						<span class="material-symbols-outlined">person</span>
					</div>
					<div class="nav-item-label">
						James Druhan
					</div>
				</div>
			</div>

			<div class="nav-items nav-mobile">
				<div class="nav-item">
					<span class="material-symbols-outlined">menu</span>
				</div>
			</div>
		</div>
	</header>
</template>
  
<script setup lang="ts">
	// TODO: Componentize navigation buttons
</script>
  
<style lang="scss" scoped>
	$mobile-bp: 480px;

	.nav
	{
		background: linear-gradient(180deg, #09224F 0%, #073382 100%);
		height: 70px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0;

		.material-symbols-outlined
		{
			font-variation-settings: 'FILL' 1, 'opsz' 24;
			font-size: 24px;
		}

		.nav-mobile
		{
			@media ( min-width : $mobile-bp )
			{
				display: none !important;
			}
		}

		.nav-desktop
		{
			@media ( max-width : $mobile-bp )
			{
				display: none !important;
			}
		}

		.nav-items
		{
			display: flex;
			align-items: center;
			color: white;
			height: 100%;

			.nav-item
			{
				cursor: pointer;
				display: flex;
				align-items: center;
				padding-left: 14px;
				padding-right: 14px;
				height: 100%;

				&:hover
				{
					background: linear-gradient(180deg, #09224F 0%, #0840a3 100%);
				}

				.nav-item-label
				{
					text-align: center;
					margin-left: 12px;
					font-size: 15px;
				}
			}

			.nav-profile
			{
				padding: 0px 24px;

				.nav-profile-icon
				{
					width: 30px;
					height: 30px;
					background: #0A7FAE;
					border-radius: 30px;
					display: flex;
					justify-content: center;
					align-items: center;

					.material-symbols-outlined
					{
						font-size: 20px !important;
					}
				}
			}
		}
	}
</style>